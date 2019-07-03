<template>
    <div>
     <h1 align="center"><strong>write</strong></h1><br/>
     <b-container fluid>
        <b-row class="my-1">
            <b-col sm="2">
            <label for="input-small">chainID:</label><br/><br/>
            <label for="input-small">chain:</label><br/>

            </b-col>
            <b-col sm="10">
            <b-form-input id="input-small" v-model="chainID" size="sm"></b-form-input><br/>
            <b-form-input id="input-small" v-model="chain" size="sm"></b-form-input>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>


<script>

    export default{
        name: 'Write'
    }

</script>

<style scoped>
</style>