<template>
    <div id="app" class="flex">
        <side-bar :selected="selectedTab" :tabs="dynamicComponents" @tabChange="changeSelectedTab" />
        <div class="bg-gray-100 h-screen w-full">
            <transition name="component-fade" mode="out-in">
                <start-business
                    v-if="selectedTab == 'start'"
                    :companyEmail="finalForm.email"
                    @saveEmail="addFinalFormEmail"
                    @tabChange="selectedTab = 'company'"
                />
                <company-type
                    v-else-if="selectedTab == 'company'"
                    :firmType="finalForm.companyType"
                    @saveCompanyType="addFinalFormCompanyType"
                    @tabChange="selectedTab = 'board'"
                />
                <board-directors
                    v-else-if="selectedTab == 'board'"
                    :team="finalForm.boardDirectors"
                    :finalMsg="finalMsg"
                    @saveTeam="addFinalFormBoardDirectors"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import StartBusiness from './components/StartBusiness.vue';
import CompanyType from './components/CompanyType.vue';
import BoardDirectors from './components/BoardDirectors.vue';
import { email, required } from 'vuelidate/lib/validators';

export default {
    name: 'App',
    components: {
        SideBar,
        StartBusiness,
        CompanyType,
        BoardDirectors,
    },
    data() {
        return {
            dynamicComponents: [
                {
                    name: 'Start Business',
                    slug: 'start',
                    completed: false,
                },
                { name: 'Company Type', slug: 'company', completed: false },
                { name: 'Board of Directors', slug: 'board', completed: false },
            ],
            finalForm: {
                email: '',
                companyType: {},
                boardDirectors: [],
            },
            selectedTab: 'start',
            finalMsg: {
                type: '',
                msg: '',
            },
        };
    },
    validations: {
        finalForm: {
            email: { required, email },
            companyType: { required },
            boardDirectors: { required },
        },
    },

    methods: {
        changeSelectedTab(value) {
            this.selectedTab = value;
        },
        addFinalFormEmail(value) {
            this.finalForm.email = value;
            this.$v.$touch();
            let startBusinessDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'start');
            if (this.$v.finalForm.email.$invalid) {
                startBusinessDynamicComponent.completed = false;
            } else {
                startBusinessDynamicComponent.completed = true;
            }
        },
        addFinalFormCompanyType(value) {
            this.finalForm.companyType = value;
            this.$v.$touch();
            let companyTypeDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'company');
            if (this.$v.finalForm.companyType.$invalid) {
                companyTypeDynamicComponent.completed = false;
            } else {
                companyTypeDynamicComponent.completed = true;
            }
        },
        addFinalFormBoardDirectors(value) {
            this.finalForm.boardDirectors = value;
            this.$v.$touch();
            let boardDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'board');
            if (this.$v.finalForm.boardDirectors.$invalid) {
                boardDynamicComponent.completed = false;
            } else {
                boardDynamicComponent.completed = true;
                this.consoleLogResult();
            }
        },
        consoleLogResult() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                let nonCompletedForms = this.dynamicComponents.filter((el) => !el.completed).map((el) => el.name);
                this.finalMsg.type = 'ERROR';
                this.finalMsg.msg = `Please complete ${nonCompletedForms.join(' and ')} forms!`;
            } else {
                this.finalMsg.type = 'SUCCESS';
                this.finalMsg.msg = 'Application recieved';
                console.log(this.finalForm);
            }
        },
    },
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.7s ease;
}
.component-fade-enter,
.component-fade-leave-to {
    opacity: 0;
}
</style>
