$( document ).ready( function() {
    // Function to send data to backend
    const sendDataToBackend = function () {
        let url = $("#url");
        $.ajax({
            type: "POST",
            url: "/api/sendToBackend",
            data: {
                url: $("#url").val()
            },
            success: function () {
                console.log("Data sent successfully... waiting for response");
            }
        });
    };
    $("#send").click(function (){
        sendDataToBackend();
    });
})
