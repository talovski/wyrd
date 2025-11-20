import { createEffect, createSignal } from "solid-js";

import { Checkbox } from "~/components/checkbox";

const HomePage = () => {
  const [toggle, setToggle] = createSignal(false);

  createEffect(() => {
    console.log("Toggle is now:", toggle());
  });
  return (
    <div>
      <button type="button" onClick={() => alert("Welcome to the Home Page")}>
        Welcome to the Home Page
      </button>
      <h1 class="font-serif">Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <p class="font-serif">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas
        cupiditate nihil quam! Perferendis quae laborum dicta alias magnam
        officia repudiandae quod. Ipsam id distinctio temporibus, quas non
        recusandae soluta.
      </p>
      <Checkbox checked={false} onInput={(checked) => console.log(checked)}>
        Unchecked
      </Checkbox>
      <Checkbox checked={true} onInput={(checked) => console.log(checked)}>
        Checked
      </Checkbox>
      <Checkbox
        checked={toggle()}
        onInput={(checked) => setToggle(checked.currentTarget.checked)}
      >
        Toggle me
      </Checkbox>
      <Checkbox
        checked={toggle()}
        disabled
        onInput={(checked) => setToggle(checked.currentTarget.checked)}
      >
        Disabled
      </Checkbox>
    </div>
  );
};

export default HomePage;
