//note2Self: when using the devtools pane with microsoft edge, be sure to save in VSCode and hit the 
//green reload button so that the live server updates both the html and js code.
//(save is command + s for mac). Also reload from the webpage and not the devtools pane
//document.getElementById("result").style.display = "none";

function makeOdometer(el, value){
    const odometer = new Odometer({
        el: el,
        value: 0,
    });
    odometer.update(value);
};

//this function checks the data to see if it is good, collects it, sorts it, then modifies the elements on the page to display results
document.getElementById("submitter").onclick = function(){
    let userWeight = parseInt(document.getElementById("weight").value);
    let userAge = parseInt(document.getElementById("age").value);
    let userFeet = parseInt(document.getElementById("userFeet").value);
    let userInches = parseInt(document.getElementById("userInches").value);
    let userActivity = parseInt(document.getElementById("activity").value);

    if(isNaN(userWeight) || userWeight > 500 || userWeight < 5){
        document.getElementById("warning").textContent = "*Invalid weight*";
    }
    else if(isNaN(userFeet)|| userFeet > 10 || userFeet < 1){
        document.getElementById("warning").textContent = "*Invalid foot length*";
    }
    else if(isNaN(userInches) || userInches > 11 || userInches < -1){
        document.getElementById("warning").textContent = "*Invalid inch length*";
    }
    else if(isNaN(userAge) || userAge > 80 || userAge < 1){
        document.getElementById("warning").textContent = "*Invalid age*";
    }
    else if(isNaN(userActivity) || userActivity > 7 || userActivity < 0){
        document.getElementById("warning").textContent = "*Invalid activty range*";
    }
    else{
        document.getElementById("result").style.visibility =  "visible";
        document.getElementById("result").style.animation =  "resultAnimation 2.5s";
        document.getElementById("warning").textContent = "";
        //adjust to fit in just one warning box
        console.log(userFeet + ", " + userInches);
        let userHeight = parseInt((document.getElementById("userFeet").value * 12)) + parseInt((document.getElementById("userInches").value));
        console.log(userHeight);
        let userSex;
        let genders = document.getElementsByName("gender");
        for(let i = 0; i < genders.length; i++){
            if(genders[i].checked)
            {
                var gender = genders[i].value;
            }
        }
        if(gender=="male")
        {
            userSex = "male";
            //change calorie amount according to needs for a male
        }
        else
        {
            userSex = "female";
            //change calorie amount accroding to needs for a female
        }

        let userGoal = document.getElementById("userGoal").value;

        let user = {
            weight: userWeight,
            age: userAge,
            height: userHeight,
            sex: userSex,
            goal: userGoal,
            activity: userActivity
        };
        //console.log(user);

        //math begins here 
        //strength training and maintenance are based off of the Mifflin St Joer equation

        let calorieMultiplier = 1.0;
        let proteinMultiplier = 1.0;
        let totalProtein = 0;
        let totalCalories = 0;
        //the above two only apply to the strength training goal

        if(userSex == "male"){
            totalCalories = parseInt((9.99 * (userWeight * 0.453592)) + (6.25 * (userHeight * 2.54)) - (4.92 * (userAge + 5)));
            console.log(totalCalories);
        }
        else{
            totalCalories = parseInt((9.99 * (userWeight * 0.453592)) + (6.25 * (userHeight * 2.54)) - (4.92 * (userAge - 161)));
        }

        if(userGoal == "maintain"){
            totalProtein = userWeight;
        }
        else if(userGoal == "strength"){
            totalProtein = userWeight;
            if(userActivity > 0 && userActivity < 3){
                calorieMultiplier = 1.375;
                proteinMultiplier = 1.2;
            }
            else if(userActivity > 2 && userActivity < 6){
                calorieMultiplier = 1.55;
                proteinMultiplier = 1.5;
            }
            else if(userActivity == 6){
                calorieMultiplier = 1.725;
                proteinMultiplier = 1.7;
            }
            else if(userActivity == 7){
                calorieMultiplier = 1.9;
                proteinMultiplier = 1.9;
            }

            totalCalories = parseInt(totalCalories * calorieMultiplier);
            totalProtein = parseInt(totalProtein * proteinMultiplier);
        }
        else if(userGoal == "weight"){
            if(userSex == "male"){
                totalProtein = parseInt(userWeight * 1.2);
                totalCalories = 1800;
            }
            else{
                totalProtein = parseInt(userWeight * 1.2);
                totalCalories = 1600;
            }
        }

        //math ends here
        console.log(totalProtein);
        console.log(totalCalories);
        /*
        document.getElementById("result").style.display = "flex";
        document.getElementById("result").classList.add("animation");
        */
        const proteinOdometer = document.getElementById("proteinOdometer");
        makeOdometer(proteinOdometer, (parseInt(totalProtein)));
        document.getElementById("proteinOdometer").style.display = "inline-block";

        const calorieOdometer = document.getElementById("calorieOdometer");
        makeOdometer(calorieOdometer, totalCalories);
        document.getElementById("calorieOdometer").style.display = "inline-block";

        document.getElementById("proteinWords").textContent = " grams per day";
        document.getElementById("calorieWords").textContent =  " calories per day";
    }
};

