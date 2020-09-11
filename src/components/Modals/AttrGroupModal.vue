<template>
    <Modal :item="item">

    </Modal>
</template>

<script>
import Modal from "@/components/Modal";
    export default {
        props: {
            new: Boolean,
            id: String
        },
        components: {
            Modal
        },
        data() {
            return {
                item: {}
            }
        },
        created(){ 
            await this.fetch()
        },
        methods: {
            async fetch() {
                try {

                } catch(err) {
                    console.log(err)

                }
            },
            async get() {
                try {

                } catch(err) {
                    this.$error(err)
                }
                await this.$api.get('attributeGroupByIdAdmin', {id: this.id})
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>