$(document).ready(function () {

    // Get workspace list
    $.ajax({
        type: 'POST',
        url: url + "getAssigned",
        data: {
            userID: token.userID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (data != false) {

                for (var i = 0; i < data.length; i++) {

                    var memberList = '';
                    var memberName = data[i].firstName.split(",");
                    var taskName = data[i].taskName.split(",");
                    var projectStartDate = data[i].projectStartDate.split(",");
                    var projectEndDate = data[i].projectEndDate.split(",");
                    var projectName = data[i].projectName.split(",");

                    for (var j = 0; j < memberName.length; j++) {
                        memberList +=
                            '<small class="bg-info text-white px-3 py-1 me-1 mb-1 mb-0 text-capitalize" style="border-radius: 2em;">' +
                            memberName[j] +
                            '</small>';
                    }

                    $('#main-container').append(
                        '<a href="#" class="text-decoration-none text-reset">' +
                        '                <div class="row m-1 py-3 px-1 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '                    <div class="col-12">' +
                        '                        <p class="mb-0">' + taskName[0] + '</p>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="m-auto">' + projectName[0] + '</small>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="text-muted m-auto">' + projectStartDate[0] + ' <i class="fas fa-chevron-right fa-fw fa-xs"></i> ' + projectEndDate[0] + '</small>' +
                        '                    </div>' +
                        '                    <div class="col-auto d-flex flex-row flex-wrap pt-3">' +
                        memberList +
                        '                    </div>' +
                        '                </div>' +
                        '</a>'
                    );
                }


            } else {
                $('#main-container').append(
                    '                <div class="row m-1 py-3 px-1 bg-white shadow-sm text-center" style="border-radius: 1em;">' +
                    '                    <div class="col-12">' +
                    '                        <p class="mb-0 text-muted">No tasks available to show.</p>' +
                    '                    </div>' +
                    '                </div>'
                );
            }
        },
        error: function () {
            $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#progress-container').hide();
        }

    });
});