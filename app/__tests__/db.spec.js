import * as db from './../components/db';

describe('Database', () => {

    describe('#addUser(email, password)', () => {
        it('should add when provided with all required parameters', async() => {
            let validEmail = 'addUser@test.companion';
            let validPassword = '123456';

            let userAdded = await db.addUser(validEmail, validPassword);
            expect(userAdded).to.equal(true);
        });

        it('should not add when provided with an invalid email', async() => {
            let invalidEmail = 'notAValidEmail';
            let validPassword = '123456';

            let userAdded = await db.addUser(invalidEmail, validPassword);
            expect(userAdded).to.equal(false);
        })

        it('should not add when no emails or passwords are provided', async() => {
            let validEmail = 'addUser@test.companion';
            let validPassword = '123456';

            let noEmailAndPassword = await db.addUser();
            let noEmail = await db.addUser('',validPassword)
            let noPassword = await db.addUser(validEmail);
            expect(noEmailAndPassword || noEmail || noPassword).to.equal(false);
        })
    });
});