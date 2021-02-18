<template>
    <div class="w-56 h-screen flex">
        <ul class="ml-4 my-auto">
            <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="mt-3 font-bold  opacity-90"
                :class="{ 'text-blue-600 underline': selected == tab.slug, 'text-gray-400': tab.completed }"
                @click="toggleComponent(tab.slug)"
            >
                {{ tab.name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        tabs: Array,
        selected: String,
    },
    methods: {
        toggleComponent(value) {
            this.$emit('tabChange', value);
        },
    },
};
</script>
<style scoped>
li:hover,
li:active {
    @apply cursor-pointer text-blue-600 underline;
}
</style>
