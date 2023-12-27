<template>
    <div id="category-container">
        <el-card>
            <el-form inline>
                <el-form-item label="一级分类">
                    <el-select v-model="categoryStore.c1Id" @change="handler1"  :disabled="scene===true?true:false" placeholder="请选择一级分类">
                        <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                            :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select v-model="categoryStore.c2Id" @change="handler2"  :disabled="scene===true?true:false" placeholder="请选择二级分类">
                        <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                            :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select v-model="categoryStore.c3Id" :disabled="scene===true?true:false"  placeholder="请选择三级分类">
                        <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                            :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useCategoryStore from "@/stores/modules/category";

defineOptions({ name: "Category" });
const props = defineProps({
    scene: {
        type: Boolean,
        default: false,
        required: false
    }
});
const categoryStore = useCategoryStore();

function getC1() {
    categoryStore.getC1();
}

function handler1() {
    categoryStore.c2Id = "",
        categoryStore.c3Arr = [],
        categoryStore.c3Id = "";
    categoryStore.getC2();
}

function handler2() {
    categoryStore.c3Id = "";
    categoryStore.getC3();
}


onMounted(() => {
    getC1()
});

</script>

<style scoped></style>