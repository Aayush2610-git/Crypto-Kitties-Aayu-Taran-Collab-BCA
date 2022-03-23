
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 46,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
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

  renderCat(defaultDNA)
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

    return (dna)
}

function renderCat(dna){
  headColor(colors[dna.headcolor],dna.headcolor)
  $('#bodycolor').val(dna.headcolor)
  MBTColor(colors[dna.mouthColor],dna.mouthColor)
  $('#MBTcol').val(dna.mouthColor)
  EyesColor(colors[dna.eyesColor],dna.eyesColor)
  $('#Eyescol').val(dna.eyescolor)
  EarsColor(colors[dna.earsColor],dna.earsColor)
  $('#Earscol').val(dna.earsColor)
  eyeVariation(dna.eyesShape)
  $('#eyeshp_col').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decor').val(dna.decorationPattern)
    micol(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    $('#mdecor').val(dna.decorationMidcolor)
    sicol(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#sdecor').val(dna.decorationSidescolor)
  animationVariation(dna.animation)
  // $('#Anime_col').val(dna.animation)
  // $("#eyeShapeGroup").hide();
  // $("#decoGroup").hide();
  // $('#midDecoGroup').hide();
  // $("#animGroup").hide();
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal) //function headcolor
})
// Changing cat colors 2
$('#MBTcol').change(()=>{
  var colorVal = $('#MBTcol').val()
  MBTColor(colors[colorVal],colorVal)
})
// Changing cat colors 3
$('#Eyescol').change(()=>{
  var colorVal = $('#Eyescol').val()
  EyesColor(colors[colorVal],colorVal)
})
// Changing cat colors 4
$('#Earscol').change(()=>{
  var colorVal = $('#Earscol').val()
  EarsColor(colors[colorVal],colorVal)
})
// Changing cat shape 
$('#eyeshp_col').change(()=>{
  var shape = parseInt($('#eyeshp_col').val()) //between 1 and 7
  eyeVariation(shape)
})
$('#Deco_col').change(()=>{
  var shape = parseInt($('#Deco_col').val())
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
$('#Anime_col').change(()=>{
  var animationVal = parseInt($('#Anime_col').val())
  animationVariation(animationVal)
})
// -----------------------------------
// $('#btnColorsTab').click(()=>{
//   $("#headGroup").show()
//   $("#eyesGroup").show()
//   $("#earsGroup").show()
//   $('#mouthgroup').show();
  
//   $("#eyeShapeGroup").hide();
//   $("#decoGroup").hide();
//   $('#midDecoGroup').hide();
//   $("#animGroup").hide();
// })
// // ----------------------------------------
// $('#btnAttributesTab').click(()=>{
//   $('#headGroup').hide();
//   $('#mouthgroup').hide();
//   $('#eyesGroup').hide();
//   $('#earsGroup').hide();

//   $('#eyeShapeGroup').show();
//   $('#decoGroup').show();
//   $('#midDecoGroup').show();
//   $("#animGroup").show();
// })
// ----------------------------------------------
//Randomize Function
$('#random').click(()=>{
  var bodycolor = Math.floor(Math.random() * 89) + 10;
  headColor(colors[bodycolor],bodycolor)
  $("#bodycolor").val(bodycolor)
  // -----------------------------
  var colorVal = Math.floor(Math.random()*89) + 10;
  MBTColor(colors[colorVal],colorVal)
  $("#MBTcol").val(colorVal)
  // -------------------------------------
  var colorVal = Math.floor(Math.random()*89) + 10;
  EyesColor(colors[colorVal],colorVal)
  $("#Eyescol").val(colorVal)
  // ------------------------------
  var colorVal = Math.floor(Math.random()*89) + 10;
  EarsColor(colors[colorVal],colorVal)
  $("#Earscol").val(colorVal)
  // -------------------------------------------
  var eyevar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  eyeVariation(eyevar)
  $("#eyeshp_col").val(eyevar)
  // ---------------------------------------
  var shape = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  eyeVariation(shape)
  $("#eyeshape").val(shape)
  // -------------------------------------
  var shape = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  decorationVariation(shape)
  $("#Deco_col").val(shape)
  
  var colorVal = Math.floor(Math.random()*89) + 10;
  micol(colors[colorVal],colorVal)
  $("#mdecor").val(colorVal)
  
  var colorVal = Math.floor(Math.random()*89) + 10;
  sicol(colors[colorVal],colorVal)
  $("#sdecor").val(colorVal)
  
  var animationVal = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  animationVariation(animationVal)
  $("#Anime_col").val(animationVal)
})

$('#reset').click(()=>{
  renderCat(defaultDNA);  
})

