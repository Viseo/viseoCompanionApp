import settings from './settings';
import {showUnreachableServerPopup} from './navigationUtil';

const serverTimeout = 2000;

export async function callWithTimeout(func, onServerTimeout) {
    let funcPromise = new Promise(async (resolve) => {
        await func();
        resolve();
    });
    let timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject();
        }, serverTimeout);
    });
    let race = Promise.race([funcPromise, timeoutPromise]);
    race.catch(() => {
        onServerTimeout();
    });
}

export async function doServerCall(func) {
    await callWithTimeout(
        () => func(),
        showUnreachableServerPopup,
    );
}

// REST API CALLS //

export const events = {
    add: async (event, userId) => {
        try {
            let imageUrl = null;
            if (event.image) {
                let formData = new FormData();
                formData.append("file", {
                    uri: event.image.uri,
                    type: "image/jpg",
                    name: event.name + '_' + event.id + '.jpg',
                });
                let responseImage = await fetch(settings.api.uploadImage, {
                    method: "POST",
                    body: formData,
                });
                imageUrl = await responseImage.text();
            }
            let response = await fetch(settings.api.addEvent(userId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...event,
                    "imageUrl": imageUrl,
                }),
            });
            return response.json();
        } catch (error) {
            console.log("db::addEvent " + error);
            return null;
        }
    },
    getAfter: async (dateAfter) => {
        try {
            let response = await fetch(settings.api.getEventAfter(dateAfter));
            return await response.json();
        } catch (error) {
            console.log("db::events.getAfter " + error);
            return [];
        }
    },
    update: async (event) => {
        try {
            let response = await fetch(settings.api.updatedEvent, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    delete: async (id) => {
        try {
            let response = await fetch(settings.api.removeEvent(id), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response)
                return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addParticipant: async (eventId, userId) => {
        try {
            let response = await fetch(settings.api.addEventParticipant(eventId, userId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await response.json();
        } catch (error) {
            console.log("db::addEventParticipant " + error);
            return null;
        }
    },
    removeParticipant: async (eventId, userId) => {
        try {
            let response = await fetch(settings.api.removeEventParticipant(eventId, userId), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return await response.json();
        } catch (error) {
            console.log("db::removeEventParticipant " + error);
            return false;
        }
    },
    sendReview: async (review) => {
        try {
            let response = await fetch(settings.api.sendReview, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            });
            return await response.json();
        } catch (error) {
            console.log("db::sendReview " + error);
            return null;
        }
    },
    updateReview: async (review) => {
        try {
            let response = fetch(settings.api.updateReview, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            });
            return await response.json();
        } catch (error) {
            console.log("db::updateReview " + error);
            return null;
        }
    },
    getRatingAverage: async (eventId) => {
        try {
            let response = await fetch(settings.api.getRatingAverage(eventId), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let responseJson = await response.json();
            if (responseJson) {
                return responseJson;
            }
        } catch (error) {
            // console.log(error);
        }
    },
    getAll: async () => {
        try {
            let response = await fetch(settings.api.getEvents);
            return await response.json();
        } catch (error) {
            console.log("db::events.getAll " + error);
            return [];
        }
    }
};

export const users = {
    get: async (userId) => {
        try {
            let response = await fetch(settings.api.getUser(userId));
            return await response.json();
        } catch (error) {
            console.log("db::getUser " + error);
            return null;
        }
    },
    getByEmail: async (email) => {
        try {
            let response = await fetch(settings.api.getUserByEmail(email));
            return await response.json();
        } catch (error) {
            console.log("db::getUserByEmail " + error);
            return null;
        }
    },
    add: async (user) => {
        try {
            let imageUrl = null;
            if (user.image) {
                let formData = new FormData();
                formData.append("file", {
                    uri: user.image.uri,
                    type: "image/jpg",
                    name: user.firstName + '_' + user.lastName + '.jpg',
                });
                let responseImage = await fetch(settings.api.uploadImage, {
                    method: "POST",
                    body: formData,
                });
                imageUrl = await responseImage.text();
            }
            let response = await fetch(settings.api.addUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        ...user,
                        "imageUrl": imageUrl,
                    }),
            });

            return await response.json();
        } catch (error) {
            console.log("db::addUser " + error);
            return false;
        }
    },
    update: async (user) => {
        try {
            let image = null;
            if (user.imageUrl) {
                let formData = new FormData();
                formData.append("file", {
                    uri: user.imageUrl.uri,
                    type: "image/jpg",
                    name: user.firstName + '_' + user.lastName + '.jpg',
                });
                let responseImage = await fetch(settings.api.uploadImage, {
                    method: "POST",
                    body: formData,
                });
                image = await responseImage.text();
            }
            let response = await fetch(settings.api.updateUser, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...user,
                    "imageUrl": image,
                }),
            });
            return await response.json();
        } catch (error) {
            console.log("db::updateUser " + error);
            return null;
        }
    },
    authenticate: async (email, password) => {
        try {
            let response = await fetch(settings.api.authenticate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            return await response.json();
        } catch (error) {
            console.log("db::authenticate " + error);
            return null;
        }
    },
    sendResetPassword: async (email) => {
        try {
            let response = await fetch(settings.api.resetPassword(email),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            return await response.text();
        } catch (error) {
            console.log("db::sendEmailPassword" + error);
            return null;
        }
    },
};

export const comments = {
    getByEvent: async (eventId) => {
        try {
            let response = await fetch(settings.api.getPublishedCommentsByEvent(eventId));
            return await response.json();
        } catch (error) {
            console.log("db::comments.getByEvent " + error);
            return [];
        }
    },
    add: async (comment) => {
        try {
            await fetch(settings.api.addComment, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            });
        } catch (error) {
            console.warn("db::addComment " + error);
        }
        return false;
    },
    addChild: async (childComment) => {
        try {
            let response = await fetch(settings.api.addChildComment(childComment.commentId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(childComment),
            });
            let responseJson = await response.json();
            if (responseJson) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    addLike: async (commentId, userId) => {
        try {

            let response = await fetch(settings.api.likeComment(commentId, userId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let responseJson = await response.json();
            if (responseJson) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    removeLike: async (commentId, userId) => {
        try {
            let response = await fetch(settings.api.dislikeComment(commentId, userId), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let responseJson = await response.json();
            if (responseJson) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (comment) => {
        try {
            await fetch(settings.api.updatedComment, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            });
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (commentId) => {
        try {
            let response = await fetch(settings.api.deleteComment(commentId), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let responseJson = await response.json();
            if (responseJson) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};
