<template>
    <div id="app" class="flex">
        <side-bar :selected="selectedTab" :tabs="dynamicComponents" @tabChange="changeSelectedTab" />
        <div class="bg-gray-100 h-screen w-full">
            <transition name="component-fade" mode="out-in">
                <keep-alive>
                    <component
                        :is="selectedTab"
                        v-bind="dynamicComponentData.props"
                        v-on="dynamicComponentData.listeners"
                    />
                </keep-alive>
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
                    slug: 'start-business',
                    completed: false,
                },
                { name: 'Company Type', slug: 'company-type', completed: false },
                { name: 'Board of Directors', slug: 'board-directors', completed: false },
            ],
            finalForm: {
                email: '',
                companyType: {},
                boardDirectors: [],
            },
            selectedTab: 'start-business',
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
    computed: {
        dynamicComponentData() {
            if (this.selectedTab === 'start-business') {
                return {
                    props: {
                        companyEmail: this.finalForm.email,
                    },
                    listeners: {
                        saveEmail: this.addFinalFormEmail,
                        tabChange: () => {
                            this.selectedTab = 'company-type';
                        },
                    },
                };
            } else if (this.selectedTab === 'company-type') {
                return {
                    props: {
                        firmType: this.finalForm.companyType,
                    },
                    listeners: {
                        saveCompanyType: this.addFinalFormCompanyType,
                        tabChange: () => {
                            this.selectedTab = 'board-directors';
                        },
                    },
                };
            } else if (this.selectedTab === 'board-directors') {
                return {
                    props: {
                        team: this.finalForm.boardDirectors,
                        finalMsg: this.finalMsg,
                    },
                    listeners: {
                        saveTeam: this.addFinalFormBoardDirectors,
                    },
                };
            }
        },
    },
    methods: {
        changeSelectedTab(value) {
            this.selectedTab = value;
        },
        addFinalFormEmail(value) {
            this.finalForm.email = value;
            let startBusinessDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'start-business');
            startBusinessDynamicComponent.completed = this.$v.finalForm.email.$invalid ? false : true;
        },
        addFinalFormCompanyType(value) {
            this.finalForm.companyType = value;
            let companyTypeDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'company-type');
            companyTypeDynamicComponent.completed = this.$v.finalForm.companyType.$invalid ? false : true;
        },
        addFinalFormBoardDirectors(value) {
            this.finalForm.boardDirectors = value;

            let boardDynamicComponent = this.dynamicComponents.find((el) => el.slug == 'board-directors');
            boardDynamicComponent.completed = this.$v.finalForm.boardDirectors.$invalid ? false : true;
            boardDynamicComponent.completed && this.consoleLogResult();
        },
        consoleLogResult() {
            if (this.$v.$invalid) {
                let nonCompletedForms = this.dynamicComponents.filter((el) => !el.completed).map((el) => el.name);
                this.finalMsg.type = 'ERROR';
                this.finalMsg.msg = `Please complete ${nonCompletedForms.join(' and ')} forms!`;
                setTimeout(() => {
                    this.finalMsg.type = '';
                    this.finalMsg.msg = '';
                }, 3500);
            } else {
                this.finalMsg.type = 'SUCCESS';
                this.finalMsg.msg = 'Application recieved!';
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
