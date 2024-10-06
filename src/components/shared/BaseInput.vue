<template>
    <div>
        <label :for="name">{{ label }}</label>
        <input id:name :type="type" :value="modelValue" :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script lang="ts">
export default {
    props: {
        modelValue: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        inputClass: {
            type: String,
            default: '',
        },
        inputId: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped></style>