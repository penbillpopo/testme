<template>
    <div>
        <div class="toolbar">
            <router-link class="item" to="/member/testEdit">
                <img class="icon" src="@/assets/img/icon/pen.svg" alt="">
                <p class="text">Add Test</p>
            </router-link>
        </div>
        <div class="filecontainer w1200">
            <div class="filebox">
                <div class="headbar">
                    <h6 class="title">Tests</h6>
                    <router-link class="btn" type="button" to="/member">
                        <img class="icon" src="@/assets/img/icon/filter.svg" alt="">
                        <p class="text">Back</p>
                    </router-link>
                </div>
                <div class="fileitembox">
                    <div class="fileitem" v-for="n in 10" :key="n">
                        <div class="titlefield">
                            <div class="left">
                                <img class="icon" src="@/assets/img/icon/filter.svg" alt="">
                                <p class="text">Test_0{{n}}</p>
                            </div>
                            <div class="right">
                                <button class="dotbtn" type="button">:</button>
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
