<template>
    <div id="navbar">
        <div class="left">
            <router-link class="logo" to="/index">
                <h5 class="text">
                    TESTME
                </h5>
            </router-link>
        </div>
        <div class="right">
            <div class="mode_loginout">
                <button type="button" class="login">
                    <p class="text">
                        LOGIN
                    </p>
                </button>
                <button type="button" class="regist">
                    <p class="text">
                        REGIST
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {    
}
</script>

<style lang="scss" src="@/assets/scss/components/navbar.scss"></style>