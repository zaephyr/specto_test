<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 mx-auto pt-36 lg:px-4">
            <div class="flex flex-col w-full mx-auto mb-12 text-left lg:w-2/3 lg:text-center">
                <h1 class="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font">
                    Start your business now
                </h1>
                <p class="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">
                    Creating your company in US is just a few steps away. <br />
                    Enter your email adress to continue.
                </p>
            </div>
            <form
                @submit.prevent="saveEmail"
                class="flex flex-col w-full px-0 mx-auto lg:w-2/3 sm:flex-row sm:justify-between md:px-8"
            >
                <div class="relative w-full mr-4">
                    <input
                        v-model.trim="formEmail"
                        @input="$v.$touch()"
                        placeholder="Your Email"
                        type="email"
                        class="flex-grow w-full px-4 py-2 mb-4  text-base text-black transition duration-1000
                    ease-in-out transform rounded-lg bg-blueGray-200 focus:outline-none focus:border-purple-500 sm:mb-0
                    focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                        :class="{
                            'border-2 border-red-500': $v.formEmail.$error,
                        }"
                    />
                    <div class="error" v-if="!$v.formEmail.email">Proper email is required</div>
                </div>

                <div>
                    <button
                        @click="saveEmail"
                        class="w-44 flex justify-between px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                    >
                        Get started
                        <span class="h-full pt-1"
                            ><svg
                                class="w-4 h-4 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                /></svg
                        ></span>
                    </button>

                    <p v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                    <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                    <p v-if="submitStatus === 'PENDING'">Saving...</p>
                </div>
            </form>
        </div>
    </section>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators';
export default {
    props: {
        companyEmail: String,
    },
    data() {
        return {
            formEmail: '',
            submitStatus: null,
        };
    },
    validations: {
        formEmail: { required, email },
    },
    mounted() {
        this.formEmail = this.companyEmail;
    },
    methods: {
        saveEmail() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'PENDING';
                this.$emit('saveEmail', this.formEmail);
                setTimeout(() => {
                    this.submitStatus = 'OK';
                    this.$emit('tabChange');
                }, 700);
            }
        },
    },
};
</script>
