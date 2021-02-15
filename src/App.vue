<template>
    <div id="app" class="flex">
        <side-bar :selected="selectedTab" :tabs="dynamicComponents" @tabChange="changeSelectedTab" />
        <div class="bg-gray-100 h-screen w-full">
            <start-bussiness v-if="selectedTab == 'start'" />
            <company-type v-else-if="selectedTab == 'company'" />
            <board-directors v-else-if="selectedTab == 'board'" />
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import StartBussiness from './components/StartBussiness.vue';
import CompanyType from './components/CompanyType.vue';
import BoardDirectors from './components/BoardDirectors.vue';

export default {
    name: 'App',
    components: {
        SideBar,
        StartBussiness,
        CompanyType,
        BoardDirectors,
    },
    data() {
        return {
            dynamicComponents: [
                { name: 'Start Bussiness', slug: 'start', completed: false },
                { name: 'Company Type', slug: 'company', completed: false },
                { name: 'Board of Directors', slug: 'board', completed: false },
            ],
            selectedTab: 'start',
        };
    },
    methods: {
        changeSelectedTab(value) {
            this.selectedTab = value;
        },
    },
};
</script>

<style></style>
