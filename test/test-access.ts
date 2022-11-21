import { strict as assert } from 'assert'
import { base32 } from 'multiformats/bases/base32'
import { start } from '@libp2p/interfaces/startable'

import { Entry } from '~entry/basal/index.js'
import { Identity } from '~identity/basal/index.js'
import { Manifest } from '~manifest/index.js'
import { Keyvalue } from '~store/keyvalue/index.js'
import { initRegistry } from '~registry/index.js'
import { defaultManifest } from '~utils/index.js'
import { StaticAccess } from '~access/static/index.js'
import protocol, { AccessProtocol } from '~access/static/protocol.js'
import { wildcard } from '~access/util.js'

import { getStorageReturn, getIdentity, singleEntry } from './utils/index.js'

const registry = initRegistry()

registry.store.add(Keyvalue)
registry.access.add(StaticAccess)
registry.entry.add(Entry)
registry.identity.add(Identity)

describe('Static Access', () => {
  let storage: getStorageReturn, identity: Identity, entry: Entry
  const Access = StaticAccess
  const name = 'name'

  const makeaccess = (write: Array<Uint8Array | string>): AccessProtocol => ({
    protocol: Access.protocol,
    config: { write }
  })

  let yesaccess: AccessProtocol
  const anyaccess: AccessProtocol = makeaccess([wildcard])
  const noaccess: AccessProtocol = makeaccess([new Uint8Array()])
  const emptyaccess: AccessProtocol = makeaccess([])

  before(async () => {
    const obj = await getIdentity()

    storage = obj.storage
    identity = obj.identity
    entry = await singleEntry(identity)()
    yesaccess = makeaccess([identity.id])
  })

  after(async () => {
    await storage.close()
  })

  describe('Class', () => {
    it('exposes static properties', () => {
      assert.equal(Access.protocol, protocol)
      assert.equal(Access.protocol, '/opal/access/static')
    })

    describe('.open', () => {
      it('returns an instance of Static Access', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: yesaccess
        })
        const access = new Access({ manifest })
        await start(access)
        assert.equal(access.manifest, manifest)
        assert.deepEqual(access.write, new Set([base32.encode(identity.id)]))
      })

      it('returns an instance with a wildcard write', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: anyaccess
        })
        const access = new Access({ manifest })
        await start(access)
        assert.equal(access.manifest, manifest)
        assert.deepEqual(access.write, new Set(anyaccess.config.write))
      })

      it('rejects when write access is empty', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: emptyaccess
        })
        const access = new Access({ manifest })
        const promise = access.start()
        await assert.rejects(promise)
      })
    })
  })

  describe('Instance', () => {
    it('exposes instance properties', async () => {
      const manifest = await Manifest.create({
        ...defaultManifest(name, identity, registry),
        access: yesaccess
      })
      const access = new Access({ manifest })
      await start(access)
      assert.equal(access.manifest, manifest)
      assert.deepEqual(access.write, new Set([base32.encode(identity.id)]))
    })

    describe('.canAppend', () => {
      it('returns true if identity has write access', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: yesaccess
        })
        const access = new Access({ manifest })
        await start(access)
        assert.equal(await access.canAppend(entry), true)
      })

      it('returns true if wildcard has write access', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: anyaccess
        })
        const access = new Access({ manifest })
        await start(access)
        assert.equal(await access.canAppend(entry), true)
      })

      it('returns false if identity has no write access', async () => {
        const manifest = await Manifest.create({
          ...defaultManifest(name, identity, registry),
          access: noaccess
        })
        const access = new Access({ manifest })
        await start(access)
        assert.equal(await access.canAppend(entry), false)
      })
    })
  })
})
