
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function mouth(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)  //This changes the color of the cat
    $('#mbtcolour').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function eyecol(color,code) {
    $('.cat__eye').find('span').css('background', '#' + color)  //This changes the color of the cat
    $('#ec').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function epcol(color,code) {
    $('.cat__ear--left,.cat__ear--right, .cat__paw--left, .cat__paw--right,.cat__paw-right_inner,.cat__paw-left_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#epc').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function micol(color,code) {
    $('.cat__head-dots').css('background', '#' + color)  //This changes the color of the cat
    $('#middledecor').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function sicol(color,code) {
    $('.cat__head-dots_first , .cat__head-dots_second').css('background', '#' + color)  //This changes the color of the cat
    $('#sidedecor').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            return eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('up')
            return eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('spooky')
            return eyesType3()
            break
        default:
            console.log("Not 1 or 2")
            break

}}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('style1')
            normaldecoration1()
            break
        case 3:
            $('#decorationName').html('style2')
            normaldecoration2()
            break
        case 4:
            $('#decorationName').html('style3')
            normaldecoration3()
            break
        case 5:
            $('#decorationName').html('style4')
            normaldecoration4()
            break
    }
}

function animationVar(num){
    $('#dnaanimation').html(num);
    switch(num){
        case 1:
            $('#animationName').html('head')
            animationtype1();
            break;
        case 2:
            $('#animationName').html('tail')
            animationtype2();
            break;
        case 3:
            $('#animationName').html('ears')
            animationtype3();
            break;
        case 4:
            $('#animationName').html('Right ear')
            animationtype4();
            break;
        case 5:
            $('#animationName').html('Left ear')
            animationtype5();
            break;
        case 6:
            $('#animationName').html('wiggle')
            animationtype6();
            break;
    }
}

function animationtype1(){
    resetAnimation();
    $("#head").addClass("movingHead");
}

function animationtype2(){
    resetAnimation();
    $("#tail").addClass("movingTail");
}

function animationtype3(){
    resetAnimation();
    $("#rightEar").addClass("movingEarsRight");
    $("#leftEar").addClass("movingEarsLeft");  
}

function animationtype4(){
    resetAnimation();
    $("#rightEar").addClass("moving-Single-EarRight");
}

function animationtype5(){
    resetAnimation();
    $("#leftEar").addClass("moving-Single-EarLeft");
}

function animationtype6(){
    resetAnimation();
    $(".cat__ear").addClass("wiggleEar");
}

function resetAnimation(){
    $("#head").removeClass("movingHead");
    $("#tail").removeClass("movingTail");
    $("#rightEar").removeClass("movingEarsRight");
    $("#leftEar").removeClass("movingEarsLeft");
    $("#rightEar").removeClass("moving-Single-EarRight");
    $("#leftEar").removeClass("moving-Single-EarLeft");
    $(".cat__ear").removeClass("wiggleEar");
}

function normalEyes() {
    $('.cat__eye').find('span').css('border', 'none')
}
function eyesType1() {
    $('.cat__eye').find('span').css('border-top', '15px solid')
}
function eyesType2() {
    $('.cat__eye').find('span').css('border-bottom', '15px solid')
}
function eyesType3()
{
    $('.cat__eye').find('span').css({'border-top':'15px solid','border-bottom':'15px solid'})
}

function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
function normaldecoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "50% 50% 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(-180deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 0" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-1800deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 0"})
}
function normaldecoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(25deg)", "height": "25px", "width": "12px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-25deg)", "height": "25px", "width": "12px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
function normaldecoration3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(35deg)", "height": "35px", "width": "15px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-35deg)", "height": "35px", "width": "15px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
function normaldecoration4()
{
    $('.cat__head-dots').css({ "transform": "translate(0%,31%)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(90deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-90deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}