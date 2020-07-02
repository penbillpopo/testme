<template>
    <div>
        <navbar></navbar>
        <div id="member">
            <router-view></router-view>
            <!-- <testLB></testLB>         -->
        </div>
        <foot></foot>
    </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import foot from '@/components/foot.vue'
// import testLB from '@/components/testLB.vue'
export default {
    name: 'member',
    components:{
        navbar,
        foot,
        // testLB
    }
}
</script>

<style lang="scss" src="@/assets/scss/pages/member.scss"></style>
