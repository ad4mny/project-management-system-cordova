var workspaceMember = [{
    'userid': token.userID,
    'name': 'You'
}];
var taskMember = [];
var tasks = 0;
var params = new URL(window.location.href);
var workspaceID = params.searchParams.get("workspaceid");

if (workspaceID != null) {

    $("#main-container").addClass('d-none');
    $("#view-container").removeClass('d-none');

    // Get workspace view
    $.ajax({
        type: 'POST',
        url: url + "viewWorkspace",
        data: {
            workspaceID: workspaceID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                Array.isArray(data) &&
                data.length > 0
            ) {

                // Print workspace details container
                for (var i = 0; i < data[0].length; i++) {

                    var teams = '<span class=" bg-secondary text-capitalize fw-bold text-white px-3 py-2 m-1" style="border-radius: 2em;">' +
                        'You' +
                        '</span>';

                    for (var j = 0; j < data[1].length; j++) {
                        teams +=
                            '<span class=" bg-info text-capitalize fw-bold text-white px-3 py-2 m-1" style="border-radius: 2em;">' +
                            data[1][j].firstName +
                            '</span>';
                    }

                    $('#view-display').append(
                        '            <div class="row m-1 pt-0 p-3 bg-white shadow-sm g-3 text-dark" style="border-radius: 1em;">' +
                        '                <div class="col-12">' +
                        '                    <h1 class="text-dark mb-0">' + data[0][i].workspaceName + '</h1>' +
                        '                </div>' +
                        '                <div class="col-12 m-auto">' +
                        '                    <p class="text-muted">' +
                        data[0][i].startDate +
                        '                       <i class="fas fa-arrow-right fa-fw fa-sm"></i> ' +
                        data[0][i].endDate +
                        '                    </p>' +
                        '                </div>' +
                        '                <div class="col-12">' +
                        '                    <p class="">' + data[0][i].workspaceDesc + '</p>' +
                        '                </div>' +
                        '                <div class="col-auto d-flex flex-row flex-wrap" id="projectMember">' +
                        teams +
                        '                </div>' +
                        '            </div>'
                    );
                }

                // Print workspace task container
                for (var i = 0; i < data[2].length; i++) {

                    var assigns = '';
                    var userID = data[2][i].userID.split(",");
                    var taskName = data[2][i].taskName.split(",");
                    var firstName = data[2][i].firstName.split(",");

                    for (var j = 0; j < taskName.length; j++) {

                        if (userID[j] === token.userID) {
                            assigns +=
                                '<span class=" bg-secondary text-capitalize fw-bold text-white px-3 py-2 m-1" style="border-radius: 2em;">' +
                                'You' +
                                '</span>';
                        } else {
                            assigns +=
                                '<span class=" bg-info text-capitalize fw-bold text-white px-3 py-2 m-1" style="border-radius: 2em;">' +
                                firstName[j] +
                                '</span>';
                        }
                    }

                    $('#view-display').append(
                        '                <div class="row m-1 mt-3 pt-0 p-3 bg-white shadow-sm g-3" style="border-radius: 1em;">' +
                        '                    <div class="col-12">' +
                        '                        <h4 class="text-dark mb-0" id="taskName">' + taskName[0] + '</h4>' +
                        '                    </div>' +
                        '                    <div class="col-auto d-flex flex-row flex-wrap" id="taskMember">' +
                        assigns +
                        '                    </div>' +
                        '                </div>'
                    );
                }

            }

        },
        error: function () {
            $('#notice-container').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#progress-container').hide();
        }

    });

}

$(document).ready(function () {

    $(".add-workspace-btn").click(function () {
        $("#main-container").slideUp(300, function () {
            $("#main-container").addClass('d-none');
            $("#second-container").fadeIn(300);
            $("#second-container").removeClass('d-none');
        });
    });

    $(".back-btn").click(function () {
        $("#second-container").slideUp(300, function () {
            $("#second-container").addClass('d-none');
            $("#main-container").fadeIn(300);
            $("#main-container").removeClass('d-none');

        });
    });

    // Get workspace list
    $.ajax({
        type: 'POST',
        url: url + "getWorkspace",
        data: {
            userID: token.userID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                Array.isArray(data) &&
                data.length > 0
            ) {

                // Print workspace list view
                for (var i = 0; i < data[0].length; i++) {

                    var teams = '';

                    for (var j = 0; j < data[1][i].length; j++) {
                        teams += '<small class="bg-info text-white px-3 py-1 m-1 text-capitalize" style="border-radius: 2em;">' +
                            data[1][i][j].firstName +
                            '</small>';
                    }

                    $('#workspace-container').append(
                        '<a href="workspace.html?workspaceid=' + data[0][i].workspaceID + '" class="text-decoration-none text-reset">' +
                        '                <div class="row m-1 py-3 px-1 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '                    <div class="col-12">' +
                        '                        <p class="mb-0">' + data[0][i].workspaceName + '</p>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="fw-lighter text-muted m-auto">' +
                        data[0][i].startDate +
                        '                           <i class="fas fa-arrow-right fa-fw fa-xs"></i> ' +
                        data[0][i].endDate +
                        '                         </small>' +
                        '                    </div>' +
                        '                    <div class="col-auto d-flex flex-row flex-wrap pt-3">' +
                        teams +
                        '                    </div>' +
                        '                </div>' +
                        '</a>'
                    );
                }

            } else {
                $('#workspace-container').append(
                    '                <div class="row m-1 py-3 px-1 bg-white shadow-sm text-center" style="border-radius: 1em;">' +
                    '                    <div class="col-12">' +
                    '                        <p class="mb-0 text-muted">No workspace available to show.</p>' +
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

    // Get friends list
    $.ajax({
        type: 'POST',
        url: url + "getFriend",
        data: {
            userID: token.userID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                Array.isArray(data) &&
                data.length > 0 &&
                data != false
            ) {

                for (var i = 0; i < data.length; i++) {
                    $('#workspace-member-list').append(
                        '<option value="' + data[i].firstName + '" id="' + data[i].userID + '">' +
                        data[i].firstName + ' ' + data[i].lastName +
                        '</option>'
                    );
                }

            } else {
                $('#workspace-member-list').append(
                    '<option selected disabled>No available friends can add into the workspace</option>'
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

// Add task 
$(document).on('click', '.add-task-btn', function () {

    tasks++;

    $('#task-display').append(
        '                    <div class="row m-1 mt-3 p-3 pt-0 px-1 bg-white shadow-sm g-3" style="border-radius: 1em;">' +
        '                        <div class="col-12">' +
        '                            <input type="text" class="form-control p-2 px-3" name="taskName[]"' +
        '                                placeholder="Task name" style="border-radius: 1em;" required>' +
        '                        </div>' +
        '                        <div class="col-12">' +
        '                            <select class="form-select task-member-list" id="task-member-list' + tasks + '" style="border-radius: 1em;" required>' +
        '                                <option disabled selected>Add group members</option>' +
        '                            </select>' +
        '                        </div>' +
        '                        <div class="col-auto" id="task-member' + tasks + '">' +
        '                        </div>' +
        '                    </div>'
    );

    $.each(workspaceMember, function (key, value) {
        $('#task-member-list' + tasks).append(
            '<option value="' + value['name'] + '" id="' + value['userid'] + '" data-task="' + tasks + '">' + value['name'] + '</option>'
        );
    });

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

});

// Task member list output
$(document).on('change', '.task-member-list', function () {

    var id = $(this).children(":selected").attr("id");
    var value = $(this).children(":selected").attr("value");
    var taskID = $(this).children(":selected").attr("data-task");

    // Check if localStorage for member exist
    if (taskMember === null) {

        localStorage.setItem('taskMember', JSON.stringify({
            'userid': id,
            'name': value,
            'task': taskID
        }));

    } else {
        taskMember.push({
            'userid': id,
            'name': value,
            'task': taskID
        });

        localStorage.setItem('taskMember', JSON.stringify(taskMember));
    }

    $('#task-member' + taskID).html('');

    $.each(taskMember, function (key, value) {

        if (taskID === value['task']) {

            $('#task-member' + taskID).append(
                '<button type="button" class="btn btn-info text-capitalize fw-bold text-white px-3 py-2 m-1 task-member-btn" style="border-radius: 2em;" value="' + value['userid'] + '">' +
                value['name'] +
                '<i class="fas fa-times fa-fw fa-sm"></i>' +
                '</button>'
            );
        }
    });

});

// Remove from task member list
$(document).on('click', '.task-member-btn',
    function () {
        // Check if localStorage for member exist
        if (taskMember !== null) {
            taskMember.splice(taskMember.indexOf(this.value), 1);
            localStorage.setItem('taskMember', JSON.stringify(taskMember));
            $(this).remove();
        }
    }
);

// Workspace member list output
$(document).on('change', '#workspace-member-list',
    function () {
        var userID = $(this).children(":selected").attr("id");
        var name = $(this).children(":selected").attr("value");

        // Check if localStorage for member exist
        if (workspaceMember === null) {

            localStorage.setItem('workspaceMember', JSON.stringify({
                'userid': userID,
                'name': name
            }));

        } else {
            workspaceMember.push({
                'userid': userID,
                'name': name
            });

            localStorage.setItem('workspaceMember', JSON.stringify(workspaceMember));
        }

        $('#workspace-member').html('');

        $.each(workspaceMember, function (key, value) {
            $('#workspace-member').append(
                '<button type="button" class="btn btn-info text-capitalize fw-bold text-white px-3 py-2 m-1 workspace-member-btn" style="border-radius: 2em;" value="' + value['userid'] + '">' +
                value['name'] +
                '<i class="fas fa-times fa-fw fa-sm"></i>' +
                '</button>'
            );
        });

    }
);

// Remove from project member list
$(document).on('click', '.workspace-member-btn',
    function () {
        // Check if localStorage for member exist
        if (workspaceMember !== null) {
            workspaceMember.splice(workspaceMember.indexOf(this.value), 1);
            taskMember.splice(taskMember.indexOf(this.value), 1);
            localStorage.setItem('workspaceMember', JSON.stringify(workspaceMember));
            localStorage.setItem('taskMember', JSON.stringify(taskMember));
            $(this).remove();
        }
    }
);

// Create project 
$(document).on('submit', '#project-form',
    function (e) {

        e.preventDefault();
        var formData = new FormData(this);
        formData.append('workspaceMember', JSON.stringify(workspaceMember));
        formData.append('taskMember', JSON.stringify(taskMember));
        formData.append('userID', token.userID);

        $.ajax({
            type: 'POST',
            url: url + 'setWorkspace',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (data != false) {
                    alert('Successfully created your new workspace.')
                    location.reload();
                } else {
                    alert('Failed to create workspace.');
                }
            },
            error: function () {
                $('#notice-container').html(
                    '<small class="text-danger fw-light">' +
                    '<i class="fas fa-exclamation-triangle me-1 fa-fw"></i>500: Internal Server Error.' +
                    '</small>'
                );
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });

    }
);

// Delete project 
$(document).on('click', '.delete-btn',
    function () {
        $.ajax({
            type: 'POST',
            url: url + 'removeWorkspace',
            data: {
                workspaceID: workspaceID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (data != false) {
                    alert('Successfully deleted your workspace.')
                    location.replace('workspace.html');
                } else {
                    alert('Failed to delete workspace.');
                }
            },
            error: function () {
                $('#notice-container').html(
                    '<small class="text-danger fw-light">' +
                    '<i class="fas fa-exclamation-triangle me-1 fa-fw"></i>500: Internal Server Error.' +
                    '</small>'
                );
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });

    }
);