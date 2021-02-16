<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 mx-auto pt-36 lg:px-4">
            <div class="flex flex-col w-full mx-auto mb-12 text-left lg:w-2/3 lg:text-center">
                <h1 class="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font">
                    Choose the type of company
                </h1>
                <p class="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">
                    Please select the type of company from the options below.
                </p>
            </div>
            <div class="flex flex-col items-center w-full px-0 mx-auto lg:w-2/3  md:px-8">
                <button
                    v-for="(companyType, index) in companyTypes"
                    :key="index"
                    type="button"
                    class="relative px-4 py-3 my-2 inline-flex w-1/2 rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                    :class="{
                        'border-2 border-blue-200 rounded-md': selectedCompanyType == companyType,
                    }"
                    @click="selectCompanyType(companyType)"
                >
                    <div
                        :class="{
                            'opacity-50': selectedCompanyType && selectedCompanyType != companyType,
                        }"
                    >
                        <div class="flex items-center">
                            <div
                                class="text-sm text-gray-600"
                                :class="{
                                    'font-semibold': selectedCompanyType == companyType,
                                }"
                            >
                                {{ companyType.type }}
                            </div>

                            <svg
                                v-if="selectedCompanyType == companyType"
                                class="ml-2 h-5 w-5 text-green-400"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>

                        <div class="mt-2 text-xs text-gray-600">
                            {{ companyType.description }}
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        firmType: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            companyTypes: [
                { type: 'LLC', description: 'Owned by Individuals' },
                { type: 'Company', description: 'Owned by Stakeholders' },
            ],
            selectedCompanyType: null,
        };
    },
    mounted() {
        if (Object.keys(this.firmType).length === 2) {
            this.selectedCompanyType = this.companyTypes.find((el) => el.type == this.firmType.type);
        }
    },
    methods: {
        selectCompanyType(value) {
            this.selectedCompanyType = value;
            this.$emit('saveCompanyType', this.selectedCompanyType);
            setTimeout(() => {
                this.$emit('tabChange');
            }, 700);
        },
    },
};
</script>

<style></style>
