import React from "react";
import { ArrowRight, Mail } from "lucide-react";

interface INewsLetterSignUp {
  title?: string;
  description?: string;
  buttonLabel?: string;
  note?: string;
}
const NewsLetterSignUp = (props: { form?: INewsLetterSignUp }) => {
  const form = props.form;
  return (
    <div className="bg-gradient-to-br from-vina-background via-vina-muted to-vina-background text-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-2">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
          <Mail className="w-6 h-6 text-vina-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-vina-primary">
          {form?.title}
        </h3>
        <p className="text-sm opacity-90 text-vina-primary">
          {form?.description}
        </p>
      </div>
      <div className="space-y-3">
        <input
          type="email"
          placeholder="abc@email.com"
          className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border-vina-primary border"
        />
        <button className="cursor-pointer w-full bg-white text-vina-primary font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
          <span className="flex items-center justify-center space-x-2">
            <span> {form?.buttonLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
      <p className="text-xs opacity-75 text-center mt-3 text-vina-primary">
        {form?.note}
      </p>
    </div>
  );
};

export default NewsLetterSignUp;
