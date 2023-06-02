var updated = false;
function editStudentDetails(e){
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
            document.getElementById("student-name").setAttribute('value', resp.student[0].name);
            document.getElementById("student-dob").setAttribute('value', resp.student[0].dob);
            document.getElementById("student-gender").innerHTML = resp.student[0].gen;
            document.getElementById("student-id").innerHTML = resp.student[0].roll_id;
            document.getElementById("student-grade").innerHTML = resp.student[0].grade;
            document.getElementById("student-section").innerHTML = resp.student[0].section;
            document.getElementById("physics").setAttribute('value', resp.student[0].phy);
            document.getElementById("chemistry").setAttribute('value', resp.student[0].chem);
            document.getElementById("mathematics").setAttribute('value', resp.student[0].ma);
            document.getElementById("computer").setAttribute('value', resp.student[0].comp);
            document.getElementById("english").setAttribute('value', resp.student[0].eng);
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

function updatedSuccessfully(e){
    e.preventDefault();
    console.log("hello");
    var name = document.getElementById("student-name").value;
    var roll_id = document.getElementById("student-id").innerHTML;
    var gender = document.getElementById("student-gender").innerHTML;
    var dob = document.getElementById("student-dob").value;
    var grade = document.getElementById("student-grade").innerHTML;
    var section = document.getElementById("student-section").innerHTML;
    var physics = document.getElementById("physics").value;
    var chemistry = document.getElementById("chemistry").value;
    var mathematics = document.getElementById("mathematics").value;
    var computer = document.getElementById("computer").value;
    var english = document.getElementById("english").value;
    console.log(name);
    console.log(roll_id);
    console.log(gender);
    console.log(dob);
    console.log(grade);
    console.log(section);
    console.log(physics);
    console.log(chemistry);
    console.log(mathematics);
    console.log(computer);
    console.log(english);
    var main = document.getElementById("main-details-container");
    console.log(main);
    main.innerHTML = "";
    updateDetails(name, roll_id, gender, dob, grade, section, physics, chemistry, mathematics, computer, english);
}

async function updateDetails(name, roll_id, gender, dob, grade, section, physics, chemistry, mathematics, computer, english){
    const args = {
        name: name,
        roll_id: roll_id,
        gen: gender,
        dob: dob,
        grade: grade,
        section: section,
        phy: physics,
        chem: chemistry,
        ma: mathematics,
        comp: computer,
        eng: english,
    };
    await fetch("http://127.0.0.1:5000/student-details-edit", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })
    .then((resp) => {
        console.log(resp);
        if(resp.status == 200){
            updated = true;
        }
        window.scrollTo(0,0);
        var main = document.getElementById("main-details-container");
        var mainImage = document.createElement("div");
        var success = document.createElement("div");
        var goBackDiv = document.createElement("div");
        var goBackBtn = document.createElement("button");

        mainImage.innerHTML="<img src=../resources/update.svg width=\"200px\">";
        success.innerHTML = "Data Updated Successfully!";
        goBackBtn.innerHTML = "Go Back"

        mainImage.setAttribute("class", "update-image");
        success.setAttribute("class", "success");
        goBackDiv.setAttribute("class", "go-back-div");
        goBackBtn.setAttribute("class", "go-back-btn");

        main.appendChild(mainImage);
        main.appendChild(success);
        goBackDiv.appendChild(goBackBtn);
        main.appendChild(goBackDiv);

        if(updated == true){
            goBackBtn.addEventListener("click", function(){goBack()});
        }
    })
    .catch((error) => console.log(error));
}

function cancel(e){
    e.preventDefault();
    window.location.replace("./student_details.html");
}

function goBack(){
    updated = false;
    window.location.replace("./student_details.html");
}
