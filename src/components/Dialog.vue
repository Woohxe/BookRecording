<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" v-model="dialog.show">
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >

          <el-form-item
            prop="bookName"
            label="书名:"
            label-width="140px"
          >
            <el-input
              type="text"
              v-model="formData.bookName"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="bookAuthor"
            label="作者:"
            label-width="140px"
          >
            <el-input
              type="text"
              v-model="formData.bookAuthor"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="bookPublish"
            label="出版时间:"
            label-width="140px"
          >
            <el-input
              type="number"
              v-model="formData.bookPublish"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="bookDescription"
            label="简介:"
            label-width="140px"
          >
            <el-input
              type="text"
              v-model="formData.bookDescription"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="readStart"
            label="阅读开始时间:"
            label-width="140px"
          >
            <el-date-picker
              v-model="formData.readStart"
              type="datetime"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>

          <el-form-item
            prop="readEnd"
            label="阅读结束时间:"
            label-width="140px"
          >
            <el-date-picker
              v-model="formData.readEnd"
              type="datetime"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>

          <el-form-item
            prop="score"
            label="评分:"
            label-width="140px"
          >
            <el-input
              type="number"
              v-model="formData.score"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="feeling"
            label="书评:"
            label-width="140px"
          >
            <textarea
              v-model="formData.feeling"
            ></textarea>
          </el-form-item>




          <el-form-item class="text_right" label-width="140px">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, defineEmits } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(["update"]);
const props = defineProps({
  dialog: Object,
  formData: Object,
});

const form = ref(null);


const onSubmit = (form) => {
    const url = props.dialog.option == "add" ? "add" : `edit/${props.formData.bookId}`;
    proxy.$axios.post(`/book/${url}`, props.formData).then((res) => {
        // 编辑成功
        if (props.dialog.option == "edit") {
            proxy.$message({ message: "数据更新成功", type: "success" });
        } else {
            // 添加成功
            proxy.$message({ message: "数据添加成功", type: "success" });
        }
        // 隐藏dialog
        props.dialog.show = false;
        // 数据添加后 需要自己刷新 显然不合理
        // this.$emits('update') vue3 setup语法糖不是这样写
        emits("update");
    });
};
</script>

<style lang="less" scoped></style>
