# PoVRAZOR/Live
My collection of pages used for OBS Live Streaming.

## Installation Note
This project uses submodules. To checkout you should use the following command.

```bash
git clone https://github.com/mikekasprzak/live.git --recurse-submodules
```

Otherwise the submodule folders will be empty.

To fetch submodule data, you can alternatively do it explicitly.

```bash
git submodule init
git submodule sync
git submodule update
```

To get the latest changes:

```bash
git submodule update --remote
```

You'll have to push the changes, which increments the version of the submodule.
