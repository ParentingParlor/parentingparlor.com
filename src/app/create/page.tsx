'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TagSelector from '@/components/create/TagSelector';
import PreviewDialog from '@/components/create/PreviewDialog';
import { List } from 'lucide-react';
import AttachListDialog from '@/components/lists/AttachListDialog';
import CreateListDialog from '@/components/lists/CreateListDialog';
import { UserList } from '@/types';

const createTopicSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
});

type CreateTopicForm = z.infer<typeof createTopicSchema>;

export default function CreateTopic() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [attachListOpen, setAttachListOpen] = useState(false);
  const [createListOpen, setCreateListOpen] = useState(false);
  const [attachedLists, setAttachedLists] = useState<UserList[]>([]);

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<CreateTopicForm>({
    resolver: zodResolver(createTopicSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      tags: []
    }
  });

  const formValues = watch();
  const contentLength = formValues.content?.length || 0;

  const onSubmit = async (data: CreateTopicForm) => {
    try {
      // TODO: Implement topic creation with attachedLists
      router.push('/');
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  const handleAttachList = (list: UserList) => {
    setAttachedLists(prev => [...prev, list]);
    setAttachListOpen(false);
  };

  const handleCreateAndAttachList = (list: UserList) => {
    setAttachedLists(prev => [...prev, list]);
    setCreateListOpen(false);
  };

  const removeAttachedList = (listId: string) => {
    setAttachedLists(prev => prev.filter(list => list.id !== listId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Create a Topic</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
          <Button type="submit" form="create-topic-form">Create Topic</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <form id="create-topic-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('title')}
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 text-xl border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <textarea
                  {...register('content')}
                  rows={20}
                  placeholder="Share your experience or ask a question..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {contentLength}/50 characters minimum
                </div>
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
          </form>
        </div>

        {/* Right sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Lists</h2>
            <div className="space-y-4">
              {attachedLists.map((list) => (
                <div key={list.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <List className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">{list.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachedList(list.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAttachListOpen(true)}
                >
                  Attach Existing List
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateListOpen(true)}
                >
                  Create New List
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Select Tags</h2>
            <TagSelector
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
            )}
          </div>
        </div>
      </div>

      <PreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={formValues.title}
        content={formValues.content}
        tags={selectedTags}
        attachedLists={attachedLists}
      />

      <AttachListDialog
        open={attachListOpen}
        onOpenChange={setAttachListOpen}
        onAttach={handleAttachList}
      />

      <CreateListDialog
        open={createListOpen}
        onOpenChange={setCreateListOpen}
        onCreated={handleCreateAndAttachList}
      />
    </div>
  );
}