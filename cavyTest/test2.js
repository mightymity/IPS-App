export default function (spec) {

  spec.describe('Test Cavy 2', function () {
    spec.it('test GPS page', async function () {
      await spec.exists('Hamburger.button')
      await spec.pause(2000)
      await spec.press('Hamburger.button')
      await spec.pause(2000)

      await spec.exists('TF2')
      await spec.pause(2000)
      await spec.press('TF2')
      await spec.pause(2000)

      await spec.exists('GPS.search')
      await spec.pause(4000)
      await spec.press('GPS.search')
      await spec.pause(2000)

      await spec.exists('situs')
      await spec.pause(2000)
      await spec.press('situs')
      await spec.pause(2000)

      await spec.exists('GPS.search.new')
      await spec.pause(4000)
      await spec.press('GPS.search.new')
      await spec.pause(2000)

      await spec.exists('hello')
      await spec.pause(2000)
      await spec.press('hello')
      await spec.pause(2000)

      await spec.exists('GPS.cancel.button')
      await spec.pause(4000)
      await spec.press('GPS.cancel.button')
      await spec.pause(2000)
    });
  });
}