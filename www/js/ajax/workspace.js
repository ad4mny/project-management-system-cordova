var projectMember = [];
var taskMember = [];
var tasks = 0;
var params = new URL(window.location.href);
var projectID = params.searchParams.get("id");

$(document).ready(function () {

    if (projectID != null) {

        $("#main-container").addClass('d-none');
        $("#view-container").removeClass('d-none');

        // Get workspace view
        $.ajax({
            type: 'POST',
            url: url + "viewWorkspace",
            data: {
                projectID: projectID
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (data != false) {

                    var projectMember = '';

                    for (var i = 0; i < data[1].length; i++) {
                        projectMember +=
                            '<span class=" bg-info text-capitalize fw-bold text-white px-3 py-2 me-1 mb-1 " style="border-radius: 2em;">' +
                            data[1][i].firstName +
                            '</span>';
                    }

                    // Project details print
                    for (var i = 0; i < data[0].length; i++) {
                        $('#display').append(
                            '            <div class="row m-1 p-2 bg-white shadow-sm g-3 text-dark" style="border-radius: 1em;">' +
                            '                <div class="col-12">' +
                            '                    <h1 class="fw-bold mb-0">' + data[0][i].projectName + '</h1>' +
                            '                </div>' +
                            '                <div class="col-12">' +
                            '                    <p class="text-muted mb-0">' + data[0][i].projectStartDate + ' <i' +
                            '                            class="fas fa-chevron-right fa-fw fa-sm"></i> ' + data[0][i].projectEndDate + '</p>' +
                            '                </div>' +
                            '                <div class="col-12">' +
                            '                    <p class="">' + data[0][i].projectDesc + '</p>' +
                            '                </div>' +
                            '                <div class="col-auto d-flex flex-row flex-wrap" id="projectMember">' +
                            projectMember +
                            '                </div>' +
                            '            </div>'
                        );
                    }

                    // Project task print
                    for (var i = 0; i < data[2].length; i++) {
                        var taskMember = '';

                        for (var x = 0; x < data[3].length; x++) {
                            if (data[3][x].taskID == data[2][i].taskID) {
                                taskMember +=
                                    '<span class=" bg-info text-capitalize fw-bold text-white px-3 py-2 me-1 mb-1 " style="border-radius: 2em;">' +
                                    data[3][x].firstName +
                                    '</span>';
                            }
                        }

                        $('#display').append(
                            '                <div class="row m-1 mt-3 p-2 bg-white shadow-sm g-3" style="border-radius: 1em;">' +
                            '                    <div class="col-12">' +
                            '                        <h3 class="fw-bold mb-0" id="taskName">' + data[2][i].taskName + '</h2>' +
                            '                    </div>' +
                            '                    <div class="col-auto d-flex flex-row flex-wrap" id="taskMember">' +
                            taskMember +
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

            if (data['project'] != false) {

                var members = '';

                for (var i = 0; i < data[0].length; i++) {
                    members += '<small class="bg-info text-white px-3 py-1 me-1 mb-1 mb-0 text-capitalize" style="border-radius: 2em;">' +
                        data[0][i].firstName +
                        '</small>';

                }

                for (var i = 0; i < data['project'].length; i++) {
                    $('#workspace-container').append(
                        '<a href="workspace.html?id=' + data['project'][i].projectID + '" class="text-decoration-none text-reset">' +
                        '                <div class="row m-1 py-3 px-1 bg-white shadow-sm" style="border-radius: 1em;">' +
                        '                    <div class="col-12">' +
                        '                        <p class="mb-0">' + data['project'][i].projectName + '</p>' +
                        '                    </div>' +
                        '                    <div class="col-12">' +
                        '                        <small class="text-muted m-auto">' + data['project'][i].projectStartDate + ' <i class="fas fa-chevron-right fa-fw fa-xs"></i> ' + data['project'][i].projectEndDate + '</small>' +
                        '                    </div>' +
                        '                    <div class="col-auto d-flex flex-row flex-wrap pt-3">' +
                        members +
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

    // Get team members list
    $.ajax({
        type: 'POST',
        url: url + "getTeam",
        data: {
            teamID: token.teamID
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (data != false) {
                for (var i = 0; i < data[0].length; i++) {
                    $('#project-member-list').append(
                        '<option value="' + data[0][i].firstName + '" id="' + data[0][i].userID + '">' + data[0][i].firstName + '</option>'
                    );
                }
            } else {
                $('#project-member-list').append(
                    '<option selected disabled>No available member to add</option>'
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
        '                    <div class="row m-1 mt-3 py-3 px-1 bg-white shadow-sm g-3" style="border-radius: 1em;">' +
        '                        <div class="col-12">' +
        '                            <input type="text" class="form-control p-2 px-3" name="taskName[]"' +
        '                                placeholder="Task name" style="border-radius: 1em;" required>' +
        '                        </div>' +
        '                        <div id="task-member' + tasks + '">' +
        '                        </div>' +
        '                        <div class="col-12">' +
        '                            <select class="form-select task-member-list" id="task-member-list' + tasks + '" style="border-radius: 1em;" required>' +
        '                                <option disabled selected>Add group members</option>' +
        '                            </select>' +
        '                        </div>' +
        '                    </div>'
    );

    $.each(projectMember, function (key, value) {
        $('#task-member-list' + tasks).append(
            '<option value="' + value['name'] + '" id="' + value['id'] + '" data-task="' + tasks + '">' + value['name'] + '</option>'
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
            'id': id,
            'name': value,
            'task': taskID
        }));
    } else {
        taskMember.push({
            'id': id,
            'name': value,
            'task': taskID
        });
        localStorage.setItem('taskMember', JSON.stringify(taskMember));
    }

    $('#task-member' + taskID).html('');

    $.each(taskMember, function (key, value) {
        if (taskID === value['task']) {
            $('#task-member' + taskID).append(
                '<button type="button" class="btn btn-info text-capitalize fw-bold text-white px-3 py-2 me-1 mb-1 task-member-btn" style="border-radius: 2em;" value="' + value['id'] + '">' + value['name'] + '<i class="fas fa-times fa-fw fa-sm"></i></button>'
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
        }

        $('#input' + this.value).remove();
        $(this).remove();
    }
);

// Project member list output
$(document).on('change', '#project-member-list',
    function () {
        var id = $(this).children(":selected").attr("id");
        var value = $(this).children(":selected").attr("value");

        // Check if localStorage for member exist
        if (projectMember === null) {
            localStorage.setItem('projectMember', JSON.stringify({
                'id': id,
                'name': value
            }));
        } else {
            projectMember.push({
                'id': id,
                'name': value
            });
            localStorage.setItem('projectMember', JSON.stringify(projectMember));
        }

        $('#project-member').html('');

        $.each(projectMember, function (key, value) {
            $('#project-member').append(
                '<button type="button" class="btn btn-info text-capitalize fw-bold text-white px-3 py-2 me-1 mb-1 project-member-btn" style="border-radius: 2em;" value="' + value['id'] + '">' + value['name'] + '<i class="fas fa-times fa-fw fa-sm"></i></button>'
            );
        });

    }
);

// Remove from project member list
$(document).on('click', '.project-member-btn',
    function () {

        // Check if localStorage for member exist
        if (projectMember !== null) {
            projectMember.splice(projectMember.indexOf(this.value), 1);
            taskMember.splice(taskMember.indexOf(this.value), 1);
            localStorage.setItem('projectMember', JSON.stringify(projectMember));
            localStorage.setItem('taskMember', JSON.stringify(taskMember));
        }

        $('#input' + this.value).remove();
        $(this).remove();
    }
);

// Create project 
$(document).on('submit', '#project-form',
    function (e) {

        e.preventDefault();
        var formData = new FormData(this);
        formData.append('projectMember', JSON.stringify(projectMember));
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
                projectID: projectID
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