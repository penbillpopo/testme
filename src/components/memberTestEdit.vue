<template>
    <div>
        <div class="editcontainer w800">
            <button class="backbtn" type="button">
                <div class="icon"></div>
                <p class="text">back</p>
            </button>
            <div class="textfield">
                <h6 class="title">Title</h6>
                <input class="titleinput" type="text" name="testTitle" id="testTitle" placeholder="Please input title of the test">
            </div>
            <div class="textfield">
                <h6 class="title">Test</h6>
                <div class="testbox">
                    <div class="testitem">
                        <div class="headfield">
                            <p class="num">1</p>
                            <button class="closebtn"></button>
                        </div>
                        <div class="inputfield">
                            <div class="inputbox">
                                <h6 class="name">Question</h6>
                                <input class="testinput" type="text" name="question" id="">
                            </div>
                            <div class="inputbox">
                                <h6 class="name">Answer</h6>
                                <input class="testinput" type="text" name="answer" id="">
                            </div>
                        </div>
                    </div>
                </div>
                <button class="addbtn" type="button">
                    <div class="icon"></div>
                    <p class="text">Add Test</p>
                </button>
            </div>
            <div class="btnfield">
                <button class="confirmbtn" type="button">
                    <h5 class="text">Confirm</h5>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'membertestedit',
}
</script>
