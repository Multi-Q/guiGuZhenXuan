<template>
    <el-card class="box-card">
        <el-button type="primary" icon="Plus">添加品牌</el-button>
        <el-table border :data="trademarkArr" style="margin-top: 20px;">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #default="{ row, $index }">
                    <img :src="row.logoUrl" alt="没有图片" style="height: 50px;width: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #default="{ row, $index }">
                    <el-button type="primary" size="small" icon="Edit">编辑</el-button>
                    <el-button type="primary" size="small" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 4, 5, 6]"
            :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" style="margin-top: 20px;"></el-pagination>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTrademark } from "@/api/product/trademark/index";
defineOptions({ name: "TradeMark" });


// 当前页码
let pageNo = ref<number>(1);
// 每一页展示多少数据
let limit = ref<number>(3);
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<any>([]);

async function getHasTradeMark(pageNo: number, limit: number) {
    const res = await reqHasTrademark(pageNo, limit);
    if (res.code === 200) {
        // 存储已有的品牌总个数
        total.value = res.data.total;
        trademarkArr.value = res.data.records;
        return "ok";
    } else {
        return Promise.reject(new Error(res.message));
    }
}

function handleSizeChange(limitSize: number) {
   getHasTradeMark(pageNo.value, limitSize);
}
function handleCurrentChange(val: number) {
    getHasTradeMark(val, limit.value);

}

onMounted(() => {
    getHasTradeMark(pageNo.value, limit.value);
})
</script>

<style scoped></style>