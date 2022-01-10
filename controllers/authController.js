const register = (req, res) => {
  const { name, email, password } = req.body;

  res.status(200).json({ msg: 'register user' });
};

const login = (req, res) => {
  const { name, email, password } = req.body;

  res.status(200).json({ msg: 'register user value' });
};

const updateUser = (req, res) => {
  const { name, email, password } = req.body;

  res.status(200).json({ msg: 'register user' });
};

export { register, login, updateUser };
