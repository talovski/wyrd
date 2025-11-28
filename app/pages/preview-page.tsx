import { createSignal } from "solid-js";

import { Checkbox } from "~/components/ui/checkbox";
import { Dropdown } from "~/components/ui/dropdown";
import { Expandable } from "~/components/ui/expandable";
import { Masonry } from "~/components/ui/masonry";

const PrewviewPage = () => {
  const [checked, setChecked] = createSignal(false);
  return (
    <div>
      <button>Button</button>
      <Dropdown btnContent={"Btn"}>hello i am an item</Dropdown>
      <Checkbox checked={false}>sjdnjsdn</Checkbox>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox disabled checked={true}>
        Disabled
      </Checkbox>
      <Checkbox checked={checked()} onInput={() => setChecked((prev) => !prev)}>
        Toggleable
      </Checkbox>
      <button>sdkfmjkfmn</button>
      <Expandable triggerContent={<p class="text-lg font-bold">Click me to expand</p>}>
        <p>
          <span>Hello, just look at me</span>
          <span>Hello, just look at me</span>
          <span>Hello, just look at me</span>
          <span>Hello, just look at me</span>
          <span>Hello, just look at me</span>
          <span>Hello, just look at me</span>
          Hello, just look at me
        </p>
      </Expandable>
      <Expandable triggerContent={<p class="text-lg font-bold">Click me to expand again again</p>}>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
        <p>Hello, just look at me</p>
      </Expandable>

      <Masonry
        elements={[
          <div class="bg-red-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum vero modi
            perferendis molestiae maxime quasi! Alias autem qui obcaecati, ducimus delectus
            voluptate veniam quisquam facilis ullam, dolorem quae voluptatibus consequatur! Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Cumque eaque distinctio modi
            excepturi perspiciatis, ut quisquam similique alias explicabo eligendi tenetur, dolor
            voluptates nulla reiciendis consequatur consectetur debitis culpa dolores?
          </div>,
          <div class="bg-red-200">askdm</div>,
          <div class="bg-red-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, cumque rem culpa pariatur
            asperiores tempora sunt nihil possimus nemo dolorum. Vero explicabo nulla aperiam,
            incidunt aliquid eaque aliquam inventore beatae.
          </div>,
          <div class="bg-red-200">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus tempora soluta illo
            similique vitae! Unde non ut necessitatibus dignissimos voluptate. Adipisci eligendi eos
            minus odio. Corporis provident earum reiciendis Lorem ipsum dolor sit amet consectetur
            adipisicing elit. In suscipit debitis aperiam sunt, dolore omnis quisquam nostrum
            voluptates veniam eveniet esse vel quod! Sequi asperiores consectetur praesentium
            impedit quidem repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            maxime modi porro eligendi reprehenderit dolores quaerat velit? Porro incidunt amet
            sequi illum eveniet officiis? Amet fugiat sint assumenda numquam autem.
          </div>,
          <div class="bg-red-200">askdm</div>,
          <div class="bg-red-200">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, totam dolor? Nemo
            provident possimus blanditiis dolorem, eos consequatur quibusdam architecto eligendi id
            consequuntur aliquam, incidunt quo, minus ex magni sed?
          </div>,
          <div class="bg-red-200">askdm</div>,
          <div class="bg-red-200">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsum a debitis
            possimus fuga quaerat eos fugit illum suscipit maiores quas sit, corporis consequatur
            nemo tempora temporibus illo deserunt consequuntur.
          </div>,
          <div class="bg-red-200">askdm</div>,
          <div class="bg-red-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ad cum corrupti? Nostrum,
            in obcaecati tenetur sunt odit molestias praesentium veritatis labore hic fugit iusto,
            quas temporibus ipsam? Beatae, debitis!
          </div>,
          <div class="bg-red-200">askdm</div>,
          <div class="bg-red-200">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius pariatur saepe quibusdam
            beatae commodi libero provident, atque sit error, reprehenderit, eligendi impedit
            voluptas voluptatibus voluptate aut ipsum. Numquam, in vel!
          </div>,
          <div class="bg-red-200">askdm</div>,
        ]}
      />
    </div>
  );
};

export default PrewviewPage;
