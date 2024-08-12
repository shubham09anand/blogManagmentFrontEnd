import React from 'react'

const MakeComment = () => {
     return (
          <section className="w-full not-format my-6">
               <form className="mb-6 w-full">
                    <div className="py-2 mb-4 bg-white rounded-lg rounded-t-lg  border-gray-200">
                         <label htmlFor="comment" className="sr-only">Your comment</label>
                         <textarea id="comment" rows="6" className="px-3 py-2 w-full resize-none outline-none text-sm text-gray-900 focus:outline-[#34ab45] border focus:ring-0" placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                         Post comment
                    </button>
               </form>
          </section>
     )
}

export default MakeComment