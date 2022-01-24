$(document).ready(function () {

    // Get assigned spaces list
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
console.log(data);
            if (
                Array.isArray(data) &&
                data.length > 0
            ) {
                for (var i = 0; i < data.length; i++) {

                    var assigns = '';
                    var userID = data[i].userID.split(",");
                    var workspaceID = data[i].workspaceID.split(",");
                    var name = data[i].firstName.split(",");
                    var taskName = data[i].taskName.split(",");
                    var startDate = data[i].startDate.split(",");
                    var endDate = data[i].endDate.split(",");
                    var workspaceName = data[i].workspaceName.split(",");

                    for (var j = 0; j < name.length; j++) {
                        if (userID[j] === token.userID) {
                            assigns +=
                                '<small class="bg-secondary text-white px-3 py-1 m-1 text-capitalize" style="border-radius: 2em;">' +
                                'You' +
                                '</small>';
                        } else {
                            assigns +=
                            '<small class="bg-info text-white px-3 py-1 m-1 text-capitalize" style="border-radius: 2em;">' +
                            name[j] +
                            '</small>';
                        }
                    }

                    $('#main-container').append(
                        '<a href="workspace.html?workspaceid=' + workspaceID[0] + '" class="text-decoration-none text-reset">' +
                        '                <div class="row m-1 py-3 px-1 bg-white shadow" style="border-radius: 1em;">' +
                        '                    <div class="col-12">' +
                        '                        <p class="mb-0">' + taskName[0] + '</p>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="m-auto">' + workspaceName[0] + '</small>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="text-muted m-auto">' +
                        startDate[0] +
                        '                           <i class="fas fa-chevron-right fa-fw fa-xs"></i> ' +
                        endDate[0] +
                        '                        </small>' +
                        '                    </div>' +
                        '                    <div class="col-auto d-flex flex-row flex-wrap pt-3">' +
                        assigns +
                        '                    </div>' +
                        '                </div>' +
                        '</a>'
                    );
                }
            } else {
                $('#main-container').append(
                    '                <div class="row m-1 py-3 px-1 bg-white shadow text-center" style="border-radius: 1em;">' +
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