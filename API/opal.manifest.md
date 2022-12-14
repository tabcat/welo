<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [opal](./opal.md) &gt; [Manifest](./opal.manifest.md)

## Manifest class

Database Manifest

<b>Signature:</b>

```typescript
export declare class Manifest 
```

## Remarks

Manifests contain setup configuration required to participate in a Database.

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(block)](./opal.manifest._constructor_.md) |  | Constructs a new instance of the <code>Manifest</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [access](./opal.manifest.access.md) | <code>readonly</code> | Protocol |  |
|  [address](./opal.manifest.address.md) | <code>readonly</code> | [Address](./opal.address.md) |  |
|  [block](./opal.manifest.block.md) | <code>readonly</code> | BlockView&lt;ManifestData&gt; |  |
|  [entry](./opal.manifest.entry.md) | <code>readonly</code> | Protocol |  |
|  [identity](./opal.manifest.identity.md) | <code>readonly</code> | Protocol |  |
|  [meta?](./opal.manifest.meta.md) | <code>readonly</code> | any | <i>(Optional)</i> |
|  [name](./opal.manifest.name.md) | <code>readonly</code> | string |  |
|  [store](./opal.manifest.store.md) | <code>readonly</code> | Protocol |  |
|  [tag?](./opal.manifest.tag.md) | <code>readonly</code> | Uint8Array | <i>(Optional)</i> |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [asManifest(manifest)](./opal.manifest.asmanifest.md) | <code>static</code> | Optimistically coerce values into a Manifest |
|  [create(manifest)](./opal.manifest.create.md) | <code>static</code> | Create a Manifest |
|  [fetch({ blocks, address }, options)](./opal.manifest.fetch.md) | <code>static</code> | Fetch a Manifest |
|  [getTag()](./opal.manifest.gettag.md) |  | Get the Manifest Tag |
