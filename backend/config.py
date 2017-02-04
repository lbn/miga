import toml


def read_config():
    with open("config.toml") as f:
        config = toml.loads(f.read())
        return config

config = read_config()
