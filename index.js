var jpdbBaseURL = "http://api.login2explore.com:5577/" ;
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studentDBName = "SCHOOL-DB";
var studentRelationName = "STUDENT-TABLE";
var connToken = "90932839|-31949281421448142|90948247";

$("#rollNo").focus();

function validateAndGetFormData() {

    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        alert("Student Roll Number is Required");
        $("#rollNo").focus();
        return "";
    }

    var studentNameVar = $("#studentName").val();
    if (studentNameVar === "") {
        alert("Student Name is Required");
        $("#studentName").focus();
        return "";
    }

    var studentClassVar = $("#studentClass").val();
    if (studentClassVar === "") {
        alert("Student Class is Required");
        $("#studentClass").focus();
        return "";
    }

    var studentDOBVar = $("#studentDOB").val();
    if (studentDOBVar === "") {
        alert("Student DOB is Required");
        $("#studentDOB").focus();
        return "";
    }

    var studentAddressVar = $("#studentAddress").val();
    if (studentAddressVar === "") {
        alert("Student Address is Required");
        $("#studentAddress").focus();
        return "";
    }

    var studentEnrollmentDateVar = $("#studentEnrollmentDate").val();
    if (studentEnrollmentDateVar === "") {
        alert("Student Enrollment Date is Required");
        $("#studentEnrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
    rollNo: rollNoVar,
    studentName: studentNameVar,
    studentClass: studentClassVar,
    studentDOB: studentDOBVar,
    studentAddress: studentAddressVar,
    studentEnrollmentDate: studentEnrollmentDateVar,
    };

    return JSON.stringify(jsonStrObj);
}

    function resetStudent() {
        $("#rollNo").val("")
        $("#studentName").val("");
        $("#studentClass").val("");
        $("#studentDOB").val("");
        $("#studentAddress").val("");
        $("#studentEnrollmentDate").val("");
        $("#rollNo").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#change").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#rollNo").focus();

    }

    function saveStudent() {
        
        var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
            return "";
        }

        var putReqStr = createPUTRequest(connToken, jsonStr, studentDBName, studentRelationName);
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});
        resetStudent();
        $("#rollNo").focus();
    }

    function changeStudent(){
        $("#change").prop("disabled", true);
        var jsonChange = validateAndGetFormData();
        var updateRequest = createUPDATERecordRequest(connToken, jsonChange, studentDBName, studentRelationName, localStorage.getItem("recno"));
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        resetStudent();
        $("#rollNo").focus();
    }

    function getStudent(){
        var studentRollNoJsonObj = getStudentJsonObj();
        var getRequest = createGET_BY_KEYRequest(connToken, studentDBName, studentRelationName, studentRollNoJsonObj);
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL,jpdbIRL);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        if(resJsonObj.status === 400){
            $("#save").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("#studentName").focus();

        }else if(resJsonObj.status === 200){
            $("#rollNo").prop("disabled", true);
            fillData(resJsonObj);
            $("#change").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("#studentName").focus();
        }
    }

    function getStudentJsonObj(){
        var studentRollNo = $("#rollNo").val();
        var jsonStr = { rollno : studentRollNo};

        return JSON.stringify(jsonStr);
    }

    function fillData(jsonObj){
        saveRecToLocalStorage(jsonObj);
        var record = JSON.parse(jsonObj.data).record;
        $("#studentName").val(record.studentName);
        $("#studentClass").val(record.studentClass);
        $("#studentDOB").val(record.studentDOB);
        $("#studentAddress").val(record.studentAddress);
        $("#studentEnrollmentDate").val(record.studentEnrollmentDate);
    }

    function saveRecToLocalStorage(jsonObj){
        var currData = JSON.parse(jsonObj.data);
        localStorage.setItem("recno", currData.rec_no);
    }
