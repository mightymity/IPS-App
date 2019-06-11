export default function (spec) {

    spec.describe('Test Cavy', function () {
        spec.it('test BLE page', async function () {

            await spec.exists('BLE.search')
            await spec.pause(2000)
            await spec.press('BLE.search')
            await spec.pause(2000)

            await spec.exists('Search.BLE.back')
            await spec.pause(2000)
            await spec.press('Search.BLE.back')
            await spec.pause(2000)

            await spec.exists('BLE.search')
            await spec.pause(4000)
            await spec.press('BLE.search')
            await spec.pause(2000)

            await spec.exists('mighty')
            await spec.pause(2000)
            await spec.press('mighty')
            await spec.pause(2000)

            await spec.exists('BLE.search.new')
            await spec.pause(4000)
            await spec.press('BLE.search.new')
            await spec.pause(2000)

            await spec.exists('sivut')
            await spec.pause(2000)
            await spec.press('sivut')
            await spec.pause(2000)

            await spec.exists('BLE.cancel.button')
            await spec.pause(4000)
            await spec.press('BLE.cancel.button')
            await spec.pause(2000)

        });

        // spec.it('BLE: go to search', async function () {
        //     await spec.exists('BLE.search')
        //     await spec.pause(2000)
        //     await spec.press('BLE.search')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: go back to BLE page', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('Search.BLE.back')
        //     await spec.pause(2000)
        //     await spec.press('Search.BLE.back')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: go to search again', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('BLE.search')
        //     await spec.pause(2000)
        //     await spec.press('BLE.search')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: select Mr.Mighty', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('mighty')
        //     await spec.pause(2000)
        //     await spec.press('mighty')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: go to search again', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('BLE.search.new')
        //     await spec.pause(2000)
        //     await spec.press('BLE.search.new')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: select Mr.Sivut', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('sivut')
        //     await spec.pause(2000)
        //     await spec.press('sivut')
        //     await spec.pause(2000)
        // });

        // spec.it('BLE: cancel tracking', async function () {
        //     await spec.pause(2000)
        //     await spec.exists('BLE.cancel.button')
        //     await spec.pause(2000)
        //     await spec.press('BLE.cancel.button')
        //     await spec.pause(2000)
        // });

    });
}