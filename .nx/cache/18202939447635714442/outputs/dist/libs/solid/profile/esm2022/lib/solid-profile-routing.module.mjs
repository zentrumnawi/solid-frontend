import { RouterModule, UrlSegment } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
const baseUrlSegment = new UrlSegment('', {});
const routes = [
  {
    matcher: (url) => {
      if (url.length !== 2) {
        return { consumed: [baseUrlSegment] };
      }
      const firstUrlSegment = url[0]?.path;
      const secondUrlSegment = url[1]?.path;
      return {
        consumed: url,
        posParams: {
          type: new UrlSegment(firstUrlSegment, {}),
          id: new UrlSegment(secondUrlSegment, {}),
        },
      };
    },
    component: BaseComponent,
  },
];
export const SolidProfileRoutingModule = RouterModule.forChild(routes);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtcHJvZmlsZS1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcHJvZmlsZS9zcmMvbGliL3NvbGlkLXByb2ZpbGUtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBVSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFakUsTUFBTSxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsT0FBTyxFQUFFLENBQUMsR0FBaUIsRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNyQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7WUFFdEMsT0FBTztnQkFDTCxRQUFRLEVBQUUsR0FBRztnQkFDYixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7b0JBQ3pDLEVBQUUsRUFBRSxJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7aUJBQ3pDO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFDRCxTQUFTLEVBQUUsYUFBYTtLQUN6QjtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMsIFVybFNlZ21lbnQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgYmFzZVVybFNlZ21lbnQgPSBuZXcgVXJsU2VnbWVudCgnJywge30pO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgbWF0Y2hlcjogKHVybDogVXJsU2VnbWVudFtdKSA9PiB7XHJcbiAgICAgIGlmICh1cmwubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgY29uc3VtZWQ6IFtiYXNlVXJsU2VnbWVudF0gfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmlyc3RVcmxTZWdtZW50ID0gdXJsWzBdPy5wYXRoO1xyXG4gICAgICBjb25zdCBzZWNvbmRVcmxTZWdtZW50ID0gdXJsWzFdPy5wYXRoO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb25zdW1lZDogdXJsLFxyXG4gICAgICAgIHBvc1BhcmFtczoge1xyXG4gICAgICAgICAgdHlwZTogbmV3IFVybFNlZ21lbnQoZmlyc3RVcmxTZWdtZW50LCB7fSksXHJcbiAgICAgICAgICBpZDogbmV3IFVybFNlZ21lbnQoc2Vjb25kVXJsU2VnbWVudCwge30pLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50OiBCYXNlQ29tcG9uZW50LFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgU29saWRQcm9maWxlUm91dGluZ01vZHVsZSA9IFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpO1xyXG4iXX0=
