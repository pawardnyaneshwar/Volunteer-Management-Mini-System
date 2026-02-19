<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VolunteerRequest;
use App\Http\Resources\VolunteerResource;
use App\Services\VolunteerService;
use Illuminate\Http\Request;

class VolunteerController extends Controller
{
    protected $service;

    public function __construct(VolunteerService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $volunteers = $this->service->listVolunteers($request->all());
        return VolunteerResource::collection($volunteers);
    }

    public function store(VolunteerRequest $request)
    {
        $volunteer = $this->service->createVolunteer($request->validated());
        return new VolunteerResource($volunteer);
    }

    public function show($id)
    {
        $volunteer = $this->service->getVolunteer($id);
        return new VolunteerResource($volunteer);
    }

    public function update(VolunteerRequest $request, $id)
    {
        $volunteer = $this->service->updateVolunteer($id, $request->validated());
        return new VolunteerResource($volunteer);
    }

    public function destroy($id)
    {
        $this->service->deleteVolunteer($id);
        return response()->json(['message' => 'Volunteer deleted successfully']);
    }

    public function toggleStatus($id)
    {
        $volunteer = $this->service->toggleVolunteerStatus($id);
        return new VolunteerResource($volunteer);
    }

    public function stats()
    {
        return response()->json($this->service->getDashboardStats());
    }
}
