<template>
    <div>
        <!-- <Metamask/><br/> -->
        <br/><br/>

        <b-container>
        <b-row>
            <b-col><Read/><br/></b-col>
            <b-col><Write/><br/></b-col>
        </b-row>
        </b-container>
    </div>

</template>


<script>
    // import Metamask from '@/components/Metamask'
    import Read from '@/components/Read'
    import Write from '@/components/Write'

    export default {
        name: 'Main',
        // beforeCreate () {
        //     this.$store.dispatch('registerWeb3')
        // },
        components: {
            // 'Metamask': Metamask,
            'Read': Read,
            'Write': Write
        }
    }
</script>

<style scoped>
</style>