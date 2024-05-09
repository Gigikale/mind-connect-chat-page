import * as React from "react";
import Assets from "../../../commons/Assets";
import { Link } from "react-router-dom";
import OurRoutes from "../../../commons/OurRoutes";
import Slidepics from "../../../commons/Slidepics";


function LandingPage() {
  return (
    <div className="flex flex-col justify-center bg-white text-inter">
      <div className="flex flex-col justify-center px-16 pt-6 pb-3 w-full whitespace-nowrap bg-white shadow-sm leading-[140%] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between mx-10 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
          <div className="flex flex-col text-3xl font-bold tracking-wide text-blue-700">
            <div>MindConnect</div>
            <div className="shrink-0 mt-1 h-2 bg-blue-700 rounded-md" />
          </div>
          <div className="justify-center px-4 py-3 my-auto text-base font-medium tracking-normal text-white bg-blue-700 rounded-md border border-solid border-[color:var(--Blue-700,#175CD3)]">
            <Link to={OurRoutes.signup}>
            Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="px-20 py-12 w-full bg-sky-50 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch my-auto text-base leading-6 max-md:mt-10 max-md:max-w-full">
              <div className="text-5xl font-bold text-gray-900 max-md:max-w-full max-md:text-4xl">
                Mental Health Matters
              </div>
              <div className="mt-1 text-sm text-inter leading-5 text-slate-500 max-md:max-w-full">
                Share, connect, and provide support in a safe space for mental
                health. A community of empatics where you get to unburden your
                mind.
              </div>
              <div className="mt-20 tracking-normal text-inter leading-6 text-gray-900 max-md:mt-10 max-md:max-w-full">
                Mental health conditions affect millions of people worldwide.
                Many people struggle to find the support they need to cope with
                their conditions, and stigma often prevents them from seeking
                help.
                <br />
              </div>
              <div className="flex gap-5 justify-between pr-7 mt-2 max-w-full font-medium tracking-normal whitespace-nowrap w-[314px] max-md:pr-5">
                <div className="justify-center px-4 py-3 text-blue-700 rounded-md border border-solid border-[color:var(--Blue-700,#175CD3)]">
                    <Link to={OurRoutes.login}>
                  Sign In
                  </Link>
                </div>
                <div className="justify-center px-4 py-3 text-white bg-blue-700 rounded-md border border-solid border-[color:var(--Blue-700,#175CD3)]">
                    <Link to={OurRoutes.signup}>
                  Register Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex overflow-hidden relative flex-col justify-end items-center px-16 pt-12 pb-4 w-full min-h-[640px] 
              max-md:px-5 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet={Assets.hands}
                  className="object-cover absolute inset-0 size-full"
                />
                <Slidepics  />
                {/* <img
                  loading="lazy"
                  srcSet={Assets.anxiety}
                  className="mt-96 max-w-full aspect-[2.38] w-[400px] max-md:mt-10"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col my-8 w-full max-w-[1187px] max-md:max-w-full">
          <div className="self-center text-5xl font-bold text-gray-900 whitespace-nowrap leading-[67.2px] max-md:text-4xl">
            What We Provide
          </div>
          <div className="mt-14 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow items-center max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet={Assets.garden}
                    className="w-60 max-w-full aspect-square rounded-full object-cover"
                  />
                  <div className="mt-4 text-2xl font-bold leading-8 text-blue-700 whitespace-nowrap">
                    Safe Space
                  </div>
                  <div className="self-stretch mt-1 text-sm text-inter leading-5 text-slate-500">
                    Share, connect, and provide support in a safe space for
                    mental health. A community of empatics where you get to
                    unburden your mind.
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow items-center max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet={Assets.discuss}
                    className="w-60 max-w-full aspect-square rounded-full object-cover"
                  />
                  <div className="mt-4 text-2xl font-bold leading-8 text-blue-700">
                    Share
                  </div>
                  <div className="self-stretch mt-1 text-sm text-inter leading-5 text-slate-500">
                    Share, connect, and provide support in a safe space for
                    mental health. A community of empatics where you get to
                    unburden your mind.
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet={Assets.backview}
                    className="self-center w-60 max-w-full aspect-square rounded-full object-cover"
                  />
                  <div className="mt-4 text-2xl font-bold leading-8 text-blue-700 whitespace-nowrap">
                    Supportive Community
                  </div>
                  <div className="mt-1 text-sm text-inter leading-5 text-slate-500">
                    Share, connect, and provide support in a safe space for
                    mental health. A community of empatics where you get to
                    unburden your mind.
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow items-center max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet={Assets.meditation}
                    className="w-60 max-w-full aspect-square rounded-full object-cover"
                  />
                  <div className="mt-4 text-2xl font-bold leading-8 text-blue-700">
                    Learn
                  </div>
                  <div className="self-stretch mt-1 text-sm text-inter leading-5 text-slate-500">
                    Share, connect, and provide support in a safe space for
                    mental health. A community of empatics where you get to
                    unburden your mind.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pr-1.5 w-full bg-sky-50 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet={Assets.glad}
              className="grow w-full aspect-[1.18] max-md:max-w-full object-cover "
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex grow justify-center items-center px-16 py-12 text-gray-900 max-md:px-5 max-md:max-w-full">
              <div className="flex flex-col mt-8 max-w-full w-[505px]">
                <div className="self-center text-5xl font-bold whitespace-nowrap leading-[67.2px] max-md:text-4xl">
                  About Us
                </div>
                <div className="mt-6 text-base text-inter tracking-normal leading-6 max-md:max-w-full">
                  MindConnect is a social network for mental health. It is a
                  digital platform designed to provide a safe and supportive
                  community for people to share their mental health and
                  experiences and connect with others going through similar
                  challenges. The platform will allow users to learn more about
                  their symptoms, share their stories and exchange tips to stay
                  healthy.
                  <br />
                  <br />
                  Mental health conditions affect millions of people worldwide.
                  Many people struggle to find the support they need to cope
                  with their conditions, and stigma often prevents them from
                  seeking help. There is a need for a safe and confidential
                  platform where people can express their thoughts and feelings
                  without fear of judgment or stigma.
                  <br />
                  <br />
                  The app has strong privacy and security measures in place to
                  protect user’s personal information and prevent unauthorized
                  access.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full text-base leading-6 bg-gray-100 max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-12 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col items-center my-8 w-full max-w-[1193px] max-md:max-w-full">
            <div className="text-5xl font-bold text-gray-900 max-md:max-w-full max-md:text-4xl">
              Enjoy Privacy and Inclusivity
            </div>
            <div className="self-stretch mt-8 tracking-normal text-inter leading-6 text-center text-slate-500 max-md:max-w-full">
              MindConnect is a social network for mental health. It is a digital
              platform designed to provide a safe and supportive community for
              people to share their mental health and experiences and connect
              with others going through similar challenges. The platform will
              allow users to learn more about their symptoms, share their
              stories and exchange tips to stay healthy.
            </div>
            <div className="justify-center px-4 py-3 mt-6 font-medium tracking-normal text-white whitespace-nowrap bg-blue-700 rounded-md border border-solid border-[color:var(--Blue-700,#175CD3)]">
                <Link to={OurRoutes.signup}>
              Click here to join us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center pr-1.5 w-full bg-blue-700 max-md:max-w-full">
        <div className="flex flex-col items-start px-20 py-6 max-md:px-5 max-md:max-w-full">
          <div className="ml-5 text-2xl font-bold leading-8 text-slate-50 max-md:ml-2.5">
            MindConnect
          </div>
          <div className="mt-1 ml-5 w-40 h-1.5 rounded-md bg-slate-50 max-md:ml-2.5" />
          <div className="flex gap-5 justify-between items-center self-stretch mx-5 mt-4 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
            <div className="self-stretch my-auto text-sm leading-6 text-gray-900 whitespace-nowrap">
              All rights reserved. ©2023 HR MindConnect.{" "}
            </div>
            <div className="flex-auto self-stretch my-auto text-xs tracking-wide leading-4 text-slate-50 max-md:max-w-full">
              <span className="text-slate-700">
                By creating an account you agree to our{" "}
              </span>
              <span className="text-slate-50">Terms and Conditions</span>,
              <span className="text-slate-50"> Privacy Policies</span>,{" "}
              <span className="text-slate-700">and</span>
              <span className="text-slate-50"> Security Settings.</span>
            </div>
            <div className="flex flex-col self-stretch basis-0">
              <div className="flex gap-4 pr-16 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b10decfdcba767759bf9aa87580e612438bfb8c2dad65c3fefb68344b8ff4fcd?"
                  className="w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/77c0896190e57dc78d6568a96eee2b9006810462a62cd5c30ce6396e4456fa03?"
                  className="w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/67bf657709bcd851cc929b47f11e5f0157208b8426e558b863dc887153ea8ef5?"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="mt-2 text-base text-gray-900">
                info@mindconnect.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage
