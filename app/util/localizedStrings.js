/**
 * Created by AAB3605 on 21/02/2017.
 */
import LocalizedStrings from 'react-localization';


let strings = new LocalizedStrings({
    "en": {

    },
    "en-US": {
        accountCreated: "Account created! \nLet's see what's happening around!\n\n",
        createAccountLink:'First time? Create an account',
        email: 'Email',
        emailAlreadyUsed: 'This email is already used',
        forgotPassword:'Forgot password?',
        invalidEmailFormat: 'This is not a valid email.',
        invalidPasswordFormat: 'The password must contain at least 6 characters.',
        missingFormFields: 'Please fill all the fields.',
        rememberMe: 'Remember me',
        password: 'Password',
        passwordsDontMatch: "The passwords don't match.",
        signIn: 'Sign in',
        signInLink: 'Already have an account? Sign in',
        signUp: 'Sign up',
        unableToReachServer: 'There was a problem with the server, try again later or check your internet connection.',
        verifyPassword:'Verify password',
        wrongCredentials: 'The credentials you entered are not valid.',
        filterZone: 'Search by word or apply filter.',
        at:'at',
        IAmGoingToEvent:"Go",
        IAmNotGoingToEvent:"Don't go",
        goingFilter:'going',
        importantFilter:'important',
        informativeFilter:'informative',
        entertainingFilter:'entertaining',
        participantsLabel: 'Going',
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        abrDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        abrMonths: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
    },
    "fr": {
        accountCreated: "Compte créé avec succès!",
        createAccountLink:'Vous êtes nouveau? cliquez ici',
        email: 'Adresse mail',
        emailAlreadyUsed: 'Ce mail est déjà utilisé',
        forgotPassword:'Oublié?',
        invalidEmailFormat: "L'adresse mail entrée n'est pas valide",
        invalidPasswordFormat: 'The mot de passe doit contenir au minimum 6 caractères.',
        missingFormFields: 'Veuillez remplir tous les champs.',
        rememberMe: 'Se souvenir de moi',
        password: 'Mot de passe',
        passwordsDontMatch: 'Les mots de passe ne sont pas identiques',
        signIn: 'Connexion',
        signInLink: 'Vous avez déjà un compte? Se connecter',
        signUp: 'Créer un compte',
        unableToReachServer: 'Impossible de joindre le serveur, veuillez réessayer plus tard ou vérifiez votre connexion internet.',
        verifyPassword:'Vérifiez votre mot de passe',
        wrongCredentials: 'Les informations fournies sont incorrectes.',
        at:'à',
        IAmGoingToEvent:"Accepter",
        IAmNotGoingToEvent:"Décliner",
        goingFilter:'acceptés',
        importantFilter:'importants',
        informativeFilter:'informatifs',
        entertainingFilter:'divertissants',
        participantsLabel: 'Inscrits',
        days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        abrDays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        months: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        abrMonths: ["Janv.", "Fev.", "Mars", "Avr.", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
    }
});

export default strings;