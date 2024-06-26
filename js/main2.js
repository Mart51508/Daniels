var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var sitelist = [];

if (localStorage.getItem("site") != null) {
  sitelist = JSON.parse(localStorage.getItem("site"));
  looping();
}
function Main() {
  GetInputs();
  looping();
  clear()
}

function GetInputs() {
  if (validation() == true && validation2() == true) {
    var site = {
      name: SiteName.value,
      URL: SiteURL.value,
    };
    sitelist.push(site);
    localStorage.setItem("site", JSON.stringify(sitelist));
  } else {
    swal({
      text: `Site Name or Url is not valid, Please follow the rules below :\n
            Site name must contain at least 3 characters\n
            Site URL must be a valid one
            `,
    });
  }
}

function looping() {
  var cartona = ``;
  for (var i = 0; i < sitelist.length; i++) {
    cartona += `
        <tr>
        <td>${i}</td>
        <td>${sitelist[i].name}</td>
        <td><button onclick='visit(${i})' class="btn btn-bg"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick='Deletee(${i})' class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
        <td></td>
        </tr>

        `;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function clear() {
  (SiteName.value = ""), (SiteURL.value = "");
}

function Deletee(index) {
  sitelist.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(sitelist));
  looping();
}
function visit(index) {
  console.log(sitelist[index].URL);
  if (sitelist[index].URL && sitelist[index].URL.startsWith("www.")) {
    sitelist[index].URL = "http://" + sitelist[index].URL;
    window.location.href = sitelist[index].URL;
  }
}

function validation() {
  var regex =
    /^((www|WWW).[a-zA-Z]{3,}.(COM|com)|https?:\/\/[A-Za-z0-9.\/?=_&+-]{10,}$)/gm;
  if (regex.test(SiteURL.value) == true) {
    return true;
  } else {
    return false;
  }
}

function validation2() {
  var regex = /^[a-zA-Z]{3,20}$/gm;
  if (regex.test(SiteName.value) == true) {
    return true;
  } else {
    return false;
  }
}
