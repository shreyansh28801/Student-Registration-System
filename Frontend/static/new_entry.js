function new_entry(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;
    var dob = document.getElementById("dob").value;
    var grade = document.getElementById("grade").value;
    var section = document.getElementById("section").value;
    var id = document.getElementById("id").value;

    var physics = document.getElementById("physics").value;
    var chemistry = document.getElementById("chemistry").value;
    var mathematics = document.getElementById("mathematics").value;
    var cs = document.getElementById("cs").value;
    var english = document.getElementById("english").value;

    /** DEBUG **/
    console.log("Name: " + name);
    console.log("Gender:" + gender);
    console.log("DOB:" + dob);
    console.log("Grade:" + grade);
    console.log("Section:" + section);
    console.log("ID:" + id);

    console.log("Physics:" + physics);
    console.log("Chemistry:" + chemistry);
    console.log("Mathematics:" + mathematics);
    console.log("CS:" + cs);
    console.log("English:" + english);

    
    if(gender == "default"){
        alert("Please select a Gender!");
    }
    else if(grade == "default"){
        alert("Please select a Grade!");
    }
    else if(section == "default"){
        alert("Please select a Section!");
    }
    else if(physics > 100 ||physics < 0){
        alert("Please enter valid marks for Physics! (0-100)");
    }
    else if(chemistry > 100 ||chemistry < 0){
        alert("Please enter valid marks for Chemistry! (0-100)");
    }
    else if(mathematics > 100 ||mathematics < 0){
        alert("Please enter valid marks for Mathemetics! (0-100)");
    }
    else if(cs > 100 ||cs < 0){
        alert("Please enter valid marks for Computer! (0-100)");
    }
    else if(english > 100 ||english < 0){
        alert("Please enter valid marks for English!");
    }
    else{
        send_data(name, gender, dob, grade, section, id, physics, chemistry, mathematics, cs, english);
    }
}

async function send_data(name, gender, dob, grade, section, id, physics, chemistry, mathematics, cs, english){
    const args = {
        name: name,
        gen: gender,
        dob: dob,
        grade: grade,
        section: section,
        roll_id: id,
        phy: physics,
        chem: chemistry,
        ma: mathematics,
        comp: cs,
        eng: english,
    };
    await fetch("http://127.0.0.1:5000/new-entry",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })
    .then(resp => resp.json())
    .then((resp) => {
        console.log(resp.message);
        
        if(resp.message == "Student already exists"){
            alert("Student already exists! Please change the Student ID.");
        }
        else if(resp.message == "Added successfully"){
            var main = document.getElementById("form");
            main.innerHTML = "";
            window.scrollTo(0,0);
            var mainImage = document.createElement("div");
            var success = document.createElement("div");
            var addView = document.createElement("div");
            var addAnotherEntry = document.createElement("button");
            var viewData = document.createElement("button");

            mainImage.innerHTML="<img src=../resources/report.svg width=\"400px\">";
            success.innerHTML = "Entry Added Successfully!";
            addAnotherEntry.innerHTML = "Add Another Entry";
            viewData.innerHTML = "View Data";

            mainImage.setAttribute("class", "new-entry-image");
            success.setAttribute("class", "success");
            addView.setAttribute("class", "new-entry-view-data-div");
            addAnotherEntry.setAttribute("class", "add-another-entry-btn");
            viewData.setAttribute("class", "view-data-btn");

            main.appendChild(mainImage);
            main.appendChild(success);
            addView.appendChild(addAnotherEntry);
            addView.appendChild(viewData);
            main.appendChild(addView);

            addAnotherEntry.addEventListener("click", function(){addAnotherEntryFunc()});
            viewData.addEventListener("click", function(){viewDataFunc()});
        }
    })
}

function addAnotherEntryFunc(){
    window.location.replace("./new_entry.html")
}
function viewDataFunc(){
    window.location.replace("./view_data.html")
}
