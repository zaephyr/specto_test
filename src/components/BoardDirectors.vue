<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 mx-auto pt-36 lg:px-4">
            <div class="flex flex-col w-full mx-auto mb-12 text-left lg:w-2/3 lg:text-center">
                <h1 class="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font">
                    Board of directors
                </h1>
                <p class="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">
                    Details about your company directors include all of your directors name here.
                </p>
            </div>
            <form>
                <div class="flex flex-col w-full py-2 px-0 mx-auto lg:w-2/3 sm:flex-row md:px-8">
                    <div class="relative  w-1/2 mr-4">
                        <input
                            v-model.trim="requiredForm.firstName"
                            @input="$v.$touch()"
                            class="flex-grow w-full px-4 py-2 mb-4 text-base text-black transition duration-1000 ease-in-out transform rounded-lg bg-blueGray-200 focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                            placeholder="First Name"
                            type="text"
                            :class="{
                                'border-2 border-red-500': $v.requiredForm.firstName.$error,
                            }"
                        />

                        <div
                            class="error"
                            v-if="$v.requiredForm.firstName.$error && !$v.requiredForm.firstName.required"
                        >
                            First name is required
                        </div>
                        <div class="error" v-if="!$v.requiredForm.firstName.alpha">
                            Only use alphabet characters
                        </div>
                        <div class="error" v-if="!$v.requiredForm.firstName.minLength">
                            Atleast two characters are required
                        </div>
                    </div>
                    <div class="relative w-1/2">
                        <input
                            v-model="requiredForm.lastName"
                            @input="$v.$touch()"
                            class="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-black transition duration-1000 ease-in-out transform rounded-lg bg-blueGray-200 focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                            placeholder="Last Name"
                            type="text"
                            :class="{
                                'border-2 border-red-500': $v.requiredForm.lastName.$error,
                            }"
                        />

                        <div class="error" v-if="$v.requiredForm.lastName.$error && !$v.requiredForm.lastName.required">
                            Last name is required
                        </div>
                        <div class="error" v-if="!$v.requiredForm.lastName.alpha">
                            Only use alphabet characters
                        </div>
                        <div class="error" v-if="!$v.requiredForm.lastName.minLength">
                            Two characters minimum
                        </div>
                    </div>
                </div>
                <div
                    v-for="(singleForm, index) in directorsForms"
                    :key="index"
                    class="flex flex-col w-full py-2 px-0 mx-auto lg:w-2/3 sm:flex-row md:px-8"
                >
                    <div class="relative  w-1/2 mr-4">
                        <input
                            v-model.trim="singleForm.firstName"
                            @input="$v.$touch()"
                            class="flex-grow w-full px-4 py-2 mb-4 text-base text-black transition duration-1000 ease-in-out transform rounded-lg bg-blueGray-200 focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                            placeholder="First Name"
                            type="text"
                            :class="{
                                'border-2 border-red-500': $v.directorsForms.$each[index].firstName.$error,
                            }"
                        />

                        <div class="error" v-if="!$v.directorsForms.$each[index].firstName.alpha">
                            Only use alphabet characters
                        </div>
                        <div class="error" v-if="!$v.directorsForms.$each[index].firstName.minLength">
                            Atleast two characters are required
                        </div>
                    </div>
                    <div class="relative w-1/2">
                        <input
                            v-model="singleForm.lastName"
                            @input="$v.$touch()"
                            class="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-black transition duration-1000 ease-in-out transform rounded-lg bg-blueGray-200 focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                            placeholder="Last Name"
                            type="text"
                            :class="{
                                'border-2 border-red-500': $v.directorsForms.$each[index].lastName.$error,
                            }"
                        />
                        <div class="error" v-if="!$v.directorsForms.$each[index].lastName.alpha">
                            Only use alphabet characters
                        </div>
                        <div class="error" v-if="!$v.directorsForms.$each[index].lastName.minLength">
                            Two characters minimum
                        </div>
                        <button
                            v-if="directorsForms.length >= 1 && index + 1 == directorsForms.length"
                            @click="removeLastForm"
                            class="absolute -right-4 top-1"
                        >
                            x
                        </button>
                    </div>
                </div>
            </form>
            <button class="mt-4 ml-8 text-blue-500 " @click="addAdditionalForm">
                + Add Button
            </button>
        </div>
        <div class="w-full py-2 px-0 mx-auto lg:w-2/3 md:px-8">
            <button
                @click="finishTest"
                class="flex mt-12 ml-auto mr-12  px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
            >
                Finish
            </button>
            <p class="text-right" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="text-right" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="text-right" v-if="submitStatus === 'PENDING'">Saving...</p>
        </div>
        <p class="text-center text-green-400" v-if="finalMsg.type === 'SUCCESS'">{{ finalMsg.msg }}</p>
        <p class="text-center text-red-400" v-if="finalMsg.type === 'ERROR'">{{ finalMsg.msg }}</p>
    </section>
</template>

<script>
import { alpha, required, minLength } from 'vuelidate/lib/validators';

export default {
    props: {
        team: Array,
        finalMsg: Object,
    },
    data() {
        return {
            requiredForm: { firstName: '', lastName: '' },
            directorsForms: [],
            submitStatus: null,
        };
    },
    validations: {
        requiredForm: {
            firstName: { required, alpha, minLength: minLength(2) },
            lastName: { required, alpha, minLength: minLength(2) },
        },
        directorsForms: {
            $each: {
                firstName: { alpha, minLength: minLength(2) },
                lastName: { alpha, minLength: minLength(2) },
            },
        },
    },
    mounted() {
        if (!!this.team) {
            this.team.forEach((director, index) => {
                if (index === 0) {
                    this.requiredForm = director;
                } else {
                    this.directorsForms.push(director);
                }
            });
        }
    },
    methods: {
        addAdditionalForm() {
            this.directorsForms.push({ firstName: '', lastName: '' });
        },
        removeLastForm() {
            this.directorsForms.pop();
        },
        finishTest() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'PENDING';
                let formToSend = [...this.directorsForms];
                formToSend.unshift(this.requiredForm);
                this.$emit(
                    'saveTeam',
                    formToSend.filter((el) => !!el.firstName && !!el.lastName)
                );
                setTimeout(() => {
                    if (this.finalMsg.type === 'SUCCESS') {
                        this.submitStatus = 'OK';
                    } else {
                        this.submitStatus = '';
                    }
                }, 700);
            }
        },
    },
};
</script>

<style></style>
