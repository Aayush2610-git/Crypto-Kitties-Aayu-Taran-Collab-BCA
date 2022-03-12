
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1,
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA);
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){

    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouth(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)
    eyecol(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyescolor)
    epcol(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decor').val(dna.decorationPattern)
    micol(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    $('#mdecor').val(dna.decorationMidcolor)
    sicol(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#sdecor').val(dna.decorationSidescolor)
    animationVar(dna.animation)
    $("#anim").val(dna.animation)
/*
    $("#eyeShapeGroup").hide();
    $("#decoGroup").hide();
    $('#midDecoGroup').hide();
    $("#animGroup").hide();
*/
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouth(colors[colorVal],colorVal)
})
$('#eyecolor').change(()=>{
  var colorVal = $('#eyecolor').val()
  eyecol(colors[colorVal],colorVal)
})
$('#earcolor').change(()=>{
  var colorVal = $('#earcolor').val()
  epcol(colors[colorVal],colorVal)
})
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
$('#decor').change(()=>{
  var shape = parseInt($('#decor').val())
  decorationVariation(shape)
})
$('#mdecor').change(()=>{
  var colorVal = $('#mdecor').val()
  micol(colors[colorVal],colorVal)
})
$('#sdecor').change(()=>{
  var colorVal = $('#sdecor').val()
  sicol(colors[colorVal],colorVal)
})
$('#anim').change(()=>{
  var animationVal = parseInt($('#anim').val())
  animationVar(animationVal)
})

//Randomize Function
$('#random').click(()=>{
  var bodycolor = Math.floor(Math.random() * 89) + 10;
  headColor(colors[bodycolor],bodycolor)
  $("#bodycolor").val(bodycolor)

  var colorVal = Math.floor(Math.random()*89) + 10;
  mouth(colors[colorVal],colorVal)
  $("#mouthcolor").val(colorVal)

  var colorVal = Math.floor(Math.random()*89) + 10;
  eyecol(colors[colorVal],colorVal)
  $("#eyecolor").val(colorVal)
  
  var colorVal = Math.floor(Math.random()*89) + 10;
  epcol(colors[colorVal],colorVal)
  $("#earcolor").val(colorVal)
  
  var shape = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  eyeVariation(shape)
  $("#eyeshape").val(shape)
  
  var shape = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  decorationVariation(shape)
  $("#decor").val(shape)
  
  var colorVal = Math.floor(Math.random()*89) + 10;
  micol(colors[colorVal],colorVal)
  $("#mdecor").val(colorVal)
  
  var colorVal = Math.floor(Math.random()*89) + 10;
  sicol(colors[colorVal],colorVal)
  $("#sdecor").val(colorVal)
  
  var animationVal = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  animationVar(animationVal)
  $("#anim").val(animationVal)
})

$('#reset').click(()=>{
  renderCat(defaultDNA);
})
