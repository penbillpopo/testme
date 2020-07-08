<template>
    <div>
        <div class="toolbar">
            <router-link class="item" to="/member/testEdit">
                <div class="icon_test_white"></div>
                <p class="text">Add Test</p>
            </router-link>
        </div>
        <div class="filecontainer w1200">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Tests</h6>
                    <router-link class="btn" type="button" to="/member">
                        <div class="icon_filter"></div>
                        <p class="text">Filter</p>
                    </router-link>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" v-for="n in 10" :key="n">
                        <div class="titlefield">
                            <div class="title">
                                <div class="icon_test_black"></div>
                                <p class="text">Test_0{{n}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'memberfolder',
}
</script>
