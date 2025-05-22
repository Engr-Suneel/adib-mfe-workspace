import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
  withComputed,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';
import {
  startLoading,
  stopLoading,
  withLoadingState,
} from '@adib-mfe-workspace/ui-features';
import { PostService } from './post.service';
import { Post, Pagination, PostListInput } from './post.model';

interface PostState {
  pagination: Pagination<Post>;
  filters: PostListInput;
}

const initialState: PostState = {
  pagination: { totalCount: 0, items: [] },
  filters: { page: 1, limit: 5, sort: 'title', order: 'asc', query: '' },
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLoadingState(),
  withProps(() => {
    const _postService = inject(PostService);

    return {
      _postService,
    };
  }),
  withMethods((store) => {
    return {
      fetchPosts: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, startLoading());

            return store._postService.getPosts(store.filters()).pipe(
              tapResponse({
                next: (pagination: Pagination<Post>) =>
                  patchState(store, { pagination }),
                error: console.error,
                finalize: () => patchState(store, stopLoading()),
              })
            );
          })
        )
      ),

      updateFilters(newFilters: Partial<PostListInput>) {
        patchState(store, {
          filters: { ...store.filters(), ...newFilters },
        });
        this.fetchPosts();
      },
      setSearch(query: string) {
        this.updateFilters({ query, page: 1 });
      },
      setSort(sort: keyof Post) {
        const current = store.filters();
        const order =
          current.sort === sort && current.order === 'asc' ? 'desc' : 'asc';
        this.updateFilters({ sort, order });
      },
      setPage(page: number) {
        this.updateFilters({ page });
      },
      resetPosts() {
        patchState(store, { pagination: { totalCount: 0, items: [] } });
      },
    };
  }),
  withComputed((store) => ({
    posts: computed(() => store.pagination().items),
    totalPages: computed(() =>
      Math.ceil(store.pagination().totalCount / store.filters().limit)
    ),
    currentPage: computed(() => store.filters().page),
    query: computed(() => store.filters().query),
    isEmpty: computed(() => store.pagination().items.length === 0),
  }))
);
