var deleted=false;
function getStudentDetails(e){
    e.preventDefault();
    var roll_id = JSON.parse(localStorage.getItem("student"));
    console.log(roll_id);
    collect_student_data(roll_id);
}

async function collect_student_data(roll_id) {
    const args = {
        roll_id: roll_id,
    };
    await fetch("http://127.0.0.1:5000/student-details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp);
            document.getElementById("student-name").innerHTML = resp.student[0].name;
            document.getElementById("student-gender").innerHTML = resp.student[0].gen;
            document.getElementById("student-dob").innerHTML = resp.student[0].dob;
            document.getElementById("student-id").innerHTML = resp.student[0].roll_id;
            document.getElementById("student-grade").innerHTML = resp.student[0].grade;
            document.getElementById("student-section").innerHTML = resp.student[0].section;
            document.getElementById("physics").innerHTML = resp.student[0].phy;
            document.getElementById("chemistry").innerHTML = resp.student[0].chem;
            document.getElementById("mathematics").innerHTML = resp.student[0].ma;
            document.getElementById("computer").innerHTML = resp.student[0].comp;
            document.getElementById("english").innerHTML = resp.student[0].eng;
            document.getElementById("total").innerHTML = resp.student[0].total;
            document.getElementById("percentage-data").innerHTML = resp.student[0].percent;
            document.getElementById("status-data").innerHTML = resp.student[0].status;
            if(resp.student[0].status == "Pass"){
                document.getElementById("status-data").style.color = "green";
            }
            else{
                document.getElementById("status-data").style.color = "#c9060d";
            }
            if(resp.student[0].status == "Pass"){
                document.getElementById("percentage-data").style.color = "green";
            }
            else{
                document.getElementById("percentage-data").style.color = "#c9060d";
            }
            if(resp.student[0].status == "Pass"){
                var img = document.getElementById("pass-fail-image");
                img.innerHTML="<img src=../resources/pass.png width=\"50px\">";
            }
            else{
                var img = document.getElementById("pass-fail-image");
                img.innerHTML="<img src=../resources/fail.png width=\"50px\">";
            }
            
        })
        .catch((error) => console.log(error));
}

function editStudent(e){
    e.preventDefault();
    window.location.replace("./student_details_edit.html");
}

function deleteStudent(){
    window.scrollTo(0,0);
    var main = document.getElementById("main-details-container");
    main.innerHTML = "";
    window.scrollTo(0,0);
    var roll_id = JSON.parse(localStorage.getItem("student"));
    var mainImage = document.createElement("div");
    var success = document.createElement("div");
    var cancelDelete = document.createElement("div");
    var cancel = document.createElement("button");
    var deleteBtn = document.createElement("button");

    mainImage.innerHTML="<img src=../resources/warning.svg width=\"400px\">";
    success.innerHTML = 'Do you want to delete "' + `${roll_id}`+  '" entry?';
    cancel.innerHTML = "Cancel";
    deleteBtn.innerHTML = "Delete";

    mainImage.setAttribute("class", "update-image");
    success.setAttribute("class", "success");
    cancelDelete.setAttribute("class", "cancel-delete-div");
    cancel.setAttribute("class", "cancel-btn");
    deleteBtn.setAttribute("class", "delete-button");

    main.appendChild(mainImage);
    main.appendChild(success);
    cancelDelete.appendChild(cancel);
    cancelDelete.appendChild(deleteBtn);
    main.appendChild(cancelDelete);

    cancel.addEventListener("click", function(){cancelFunc()});
    deleteBtn.addEventListener("click", function(){deletefunc()});
}

function cancelFunc(){
    window.location.replace("./student_details.html");
}

function deletefunc(){
    var roll_id = JSON.parse(localStorage.getItem("student"));
    var main = document.getElementById("main-details-container");
    main.innerHTML = "";
    deleteStudentFunc(roll_id);
}

async function deleteStudentFunc(roll_id) {
    const args = {
        roll_id: roll_id,
    };
    await fetch("http://127.0.0.1:5000/student-delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })
        .then((resp) => {
            console.log(resp);
            if(resp.status == 200){
                deleted = true;
            }
            var main = document.getElementById("main-details-container");
            window.scrollTo(0,0);
            var mainImage = document.createElement("div");
            var success = document.createElement("div");
            var cancelDelete = document.createElement("div");
            var viewData = document.createElement("button");

            mainImage.innerHTML="<img src=../resources/delete.svg width=\"400px\">";
            success.innerHTML = "Entry Deleted Successfully!";
            viewData.innerHTML = "View Data";

            mainImage.setAttribute("class", "update-image");
            success.setAttribute("class", "success");
            cancelDelete.setAttribute("class", "cancel-delete-div");
            viewData.setAttribute("class", "cancel-btn");

            main.appendChild(mainImage);
            main.appendChild(success);
            cancelDelete.appendChild(viewData);
            main.appendChild(cancelDelete);

            viewData.addEventListener("click", function(){goToViewData()});
        })
        .catch((error) => console.log(error));
}

function goToViewData(){
    deleted = false;
    localStorage.removeItem("student");
    window.location.replace("./view_data.html");
}
