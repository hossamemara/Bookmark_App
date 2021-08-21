var site = document.querySelector("#sites");
var siteIndex;
var site = [];


/* _____________ Back to Website Top  Start _____________ */

$(window).scroll(function () {
    let scrollOffset = $(window).scrollTop();
    
    
    
    let to_top_btn = $('#bookmarker').offset().top;
 

    if (scrollOffset > to_top_btn) {
        $('.to-top-btn').fadeIn(1000);;
        

    }
    else {
        $('.to-top-btn').fadeOut(1000);;

    }

 
  
})

$('.to-top-btn').click(function()
{
    $('body,html').animate({ scrollTop: 0 }, 500)
})

/* _____________ Back to Website Top  End_____________ */

if (JSON.parse(localStorage.getItem("siteLists")) != null) {
    site = JSON.parse(localStorage.getItem("siteLists"))
    displayWebsite();
}
/*__________________________ addSite Start __________________________*/
$('#addWebsite').click(function () {
    if ($('#addWebsite').html() == "Add Website") {

        addSite();
        displayWebsite();

    }
    else {
        updateWebsite();
    }

})
/*__________________________ addSite End __________________________*/


/*________________ addSite Start ________________*/
function addSite() {

    if (checkSiteName() && checkSiteUrl()) {

        var mySites =
        {
            websiteName: $('#site-name').val(),
            websiteURl: $('#site-url').val(),
        }

        site.push(mySites);
        localStorage.setItem("siteLists", JSON.stringify(site))

    }


    resetForm();
}/*________________ addSite End ________________*/


/*________________ displayWebsite Start ________________*/
function displayWebsite() {

    var siteContainer = "";
    for (var i = 0; i < site.length; i++) {
        siteContainer +=
            `
        <div class="site col-lg-3 col-md-4 col-sm-6 my-3">

        <div class="site-favorite p-2 text-center">
            <h3 class="text-center p-2 text-white">${site[i].websiteName}</h3>
            <div class="text-center my-3">
            <a href="${site[i].websiteURl}" target="_blank"><button class="btn btn-success"><i class="fas fa-glasses fa-2x"></i>
            </button></a>
            <a href="#bookmarker"><button class="btn btn-info" id="editSite" onclick="getWebsitesData(${i})"><i class="fas fa-edit fa-2x"></i>
            </button></a>

   
            <button class="btn btn-danger" id="deleteSite" onclick="deleteWebSite(${i})"><i class="far fa-trash-alt fa-2x"></i></button>
            </div>
        </div>
    </div>
        
        `;
    }
    $('#website').html(siteContainer);


}
/*________________ displayWebsite End ________________*/


/*________________ deleteWebSite Start ________________*/
function deleteWebSite(index) {
    
    site.splice(index, 1);
    localStorage.setItem("siteLists", JSON.stringify(site))
    displayWebsite()
}
/*________________ deleteWebSite End ________________*/


/*________________ resetForm Start ________________*/
var alerts;
function resetForm() {

    var formInputs = document.getElementsByClassName('form-control');

    var alertsInputs = document.getElementsByClassName('alert');

    for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].value = "";
        formInputs[i].classList.remove('is-valid')
        formInputs[i].classList.remove('is-invalid')


    }
    for (var i = 0; i < alertsInputs.length; i++) {
        alertsInputs[i].classList.add('d-none')


    }









}
/*________________ resetForm End ________________*/


/*________________ getWebsitesData Start ________________*/
function getWebsitesData(index) {
    $('#addWebsite').html("Update Website");
    $('#site-name').val(site[index].websiteName);
    $('#site-url').val(site[index].websiteURl);

    siteIndex = index;
}
/*________________ getWebsitesData End ________________*/


/*________________ updateWebsite Start ________________*/
function updateWebsite() {

    var mySites =
    {


        websiteURl: $('#site-url').val(),
        websiteName: $('#site-name').val()

    }

    site[siteIndex] = mySites;
    localStorage.setItem("siteLists", JSON.stringify(site))
    $('#addWebsite').html("Add Website");
    resetForm()
    displayWebsite();

}
/*________________ updateWebsite End ________________*/

/*________________ Search Favorites Websites Start ________________*/

$('#search-by-name').keyup(function () {
    var siteContainer = "";
    for (var i = 0; i < site.length; i++) {
        if (site[i].websiteName.toLowerCase().includes(this.value.toLowerCase())) {
            siteContainer +=
            `
        <div class="site col-lg-3 col-md-4 col-sm-6 my-3">

        <div class="site-favorite p-2 text-center">
            <h3 class="text-center p-2 text-white">${site[i].websiteName}</h3>
            <div class="text-center my-3">
            <a href="${site[i].websiteURl}" target="_blank"><button class="btn btn-success"><i class="fas fa-glasses fa-2x"></i>
            </button></a>
            <a href="#bookmarker"><button class="btn btn-info" id="editSite" onclick="getWebsitesData(${i})"><i class="fas fa-edit fa-2x"></i>
            </button></a>

   
            <button class="btn btn-danger" id="deleteSite" onclick="deleteWebSite(${i})"><i class="far fa-trash-alt fa-2x"></i></button>
            </div>
        </div>
    </div>
        
        `;
        }}
        $('#website').html(siteContainer);  


    })


/*________________ Search Favorites Websites End ________________*/

/*____________________________________ Validation Start ____________________________________*/

/*________________ siteName Validation Start ________________*/
function checkSiteName() {
    siteNameregex = /^[A-z0-9]{3,10}$/;
    let result = siteNameregex.test($('#site-name').val())
    return result
}

function checkSiteUrl() {

    siteURLregex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    let result = siteURLregex.test($('#site-url').val())
    return result;
}

$('#site-name').keyup(function () {

    if (checkSiteName() && checkSiteUrl()) {

        $('#addWebsite').removeAttr('disabled')

    }
    else {
        $('#addWebsite').attr('disabled', 'true')
    }


    if (checkSiteName()) {
        $('#site-name').addClass("is-valid");
        $('#site-name').removeClass("is-invalid");

        $('#site-name-alert-invalid').addClass("d-none");



    }
    else {
        $('#site-name').addClass("is-invalid");
        $('#site-name').removeClass("is-valid");
        $('#site-name-alert-invalid').removeClass("d-none");




    }
    if ($('#site-name').val() == "") {
        $('#site-name').removeClass("is-invalid");
        $('#site-name').removeClass("is-valid");
        $('#site-name-alert-invalid').addClass("d-none");


    }

})
/*________________ siteName Validation End ________________*/


/*________________ siteURL Validation Start ________________*/

$('#site-url').keyup(function () {
    if (checkSiteName() && checkSiteUrl()) {

        $('#addWebsite').removeAttr('disabled')

    }
    else {
        $('#addWebsite').attr('disabled', 'true')
    }

    if (checkSiteUrl()) {
        $('#site-url').addClass("is-valid");
        $('#site-url').removeClass("is-invalid");

        $('#site-url-alert-invalid').addClass("d-none");


    }
    else {
        $('#site-url').addClass("is-invalid");
        $('#site-url').removeClass("is-valid");
        $('#site-url-alert-invalid').addClass("d-none");



    }
    if ($('#site-url').val() == "") {
        $('#site-url').removeClass("is-invalid");
        $('#site-url').removeClass("is-valid");
        $('#site-url-alert-invalid').addClass("d-none");



    }



})
/*________________ siteURL Validation End ________________*/




/*____________________________________ Validation End ____________________________________*/








